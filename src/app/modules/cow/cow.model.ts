import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { breeds, locations } from "./cow.constant";

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: locations,
    },
    breed: {
      type: String,
      required: true,
      enum: breeds,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: ["For Sale", "Sold Out"],
      default: "For Sale",
    },
    category: {
      type: String,
      required: true,
      enum: ["Dairy", "Beef", "Dual Purpose"],
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Cow = model<ICow, CowModel>("Cow", cowSchema);

export default Cow;
