import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  price: number;
  status: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: "active" },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
