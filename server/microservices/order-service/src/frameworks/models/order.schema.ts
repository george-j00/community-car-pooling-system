import mongoose, { Schema, Model } from "mongoose";
import { IOrderSchema } from "../../adapters/interfaces/IOrderSchema";

const orderSchema  = new mongoose.Schema<IOrderSchema>({
  stripeId: { type: String, required: true },
  rideId: { type: String, default: '' },
  userId: { type: String, default: '' },
  driverId: { type: String, default: '' },
  source: { type: String, default: '' },
  destination: { type: String, default: '' },
  distance: { type: String, default: '' },
  totalAmount: { type: String, default: '0' },
  bookedSeatsCount: { type: Number},
  createdAt: { type: Date, default: Date.now }
});

export const OrderModel: Model<IOrderSchema> = mongoose.model<IOrderSchema>(
  "OrderModel",
  orderSchema
);

