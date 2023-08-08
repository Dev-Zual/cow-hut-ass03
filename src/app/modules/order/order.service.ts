import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import Cow from "../cow/cow.model";
import User from "../user/user.model";
import { ICowOrder } from "./order.interface";
import mongoose from "mongoose";
import CowOrder from "./order.model";

const createOrder = async (
  orderData: Partial<ICowOrder>
): Promise<ICowOrder | null> => {
  const userId = orderData.buyer;
  const cowId = orderData.cow;
  // find user details and cow details
  const user = await User.findById(userId);
  const cow = await Cow.findById(cowId);

  if (!user || !cow) {
    throw new ApiError(httpStatus.NOT_FOUND, "user or cow not found");
  }
  if (user.budget < cow.price) {
    throw new ApiError(httpStatus.BAD_REQUEST, "insufficient budget");
  }
  let newOrderAllData;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // update cow status and cut the balance from buyer
    await Cow.findByIdAndUpdate(cow.id, { label: "Sold Out" }).session(session);
    await User.findByIdAndUpdate(user.id, {
      $inc: { budget: -cow.price },
    }).session(session);

    // update the seller balance
    await User.findByIdAndUpdate(cow.seller, { $inc: { income: cow.price } });

    // create a new order
    orderData.buyer = userId;
    orderData.seller = cow.seller;
    orderData.cow = cowId;
    orderData.amount = cow.price;
    const newOrder = await CowOrder.create([orderData], { session });
    newOrderAllData = newOrder[0];

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newOrderAllData) {
    newOrderAllData = await CowOrder.findOne({ _id: newOrderAllData._id })
      .populate("buyer")
      .populate("cow");
  }
  return newOrderAllData;
};

// get all orders
const getAllOrders = async (): Promise<ICowOrder[] | null> => {
  return await CowOrder.find();
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
