import { Schema, model } from "mongoose";
import { CowOrderModel, ICowOrder } from "./order.interface";

const cowOrderSchema = new Schema<ICowOrder, CowOrderModel>({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cow: {
    type: Schema.Types.ObjectId,
    ref: "Cow",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const CowOrder = model<ICowOrder, CowOrderModel>("CowOrder", cowOrderSchema);
export default CowOrder;
