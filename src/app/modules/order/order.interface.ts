import { Model, Types } from "mongoose";
import { ICow } from "../cow/cow.interface";
import { IUser } from "../user/user.interface";

export type ICowOrder = {
  buyer: Types.ObjectId | IUser;
  seller: Types.ObjectId | IUser;
  cow: Types.ObjectId | ICow;
  amount: number;
};

export type CowOrderModel = Model<ICowOrder, Record<string, unknown>>;
