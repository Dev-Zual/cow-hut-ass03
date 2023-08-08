import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location:
    | "Dhaka"
    | "Chattogram"
    | "Rajshahi"
    | "Barishal"
    | "Sylhet "
    | "comilla"
    | "Rangpur"
    | "Mymenshing";
  breed:
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej";
  weight: number;
  label: "For Sale" | "Sold Out";
  category: "Dairy" | "Beef" | "Dual Purpose";
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilter = {
  searchTerm?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
};
