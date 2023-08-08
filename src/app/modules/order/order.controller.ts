import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";
import { ICowOrder } from "./order.interface";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrder(req.body);

  sendResponse<ICowOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders();

  sendResponse<ICowOrder[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "order created successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
