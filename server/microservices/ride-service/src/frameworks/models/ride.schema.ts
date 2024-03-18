import mongoose, { Schema, Model } from "mongoose";
import { IRideSchema } from "../../adapters/interfaces/IRideSchema";

const rideSchema = new mongoose.Schema<IRideSchema>({
  userId: { type: String, required: true }, 
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  pickupTime: { type: String, required: true },
  dropOffTime: { type: String, required: true },
  distance: { type: String, required: true },
  duration: { type: String, required: true },
  rate: { type: String, required: true },
  seatAvailable: { type: Number, required: true , default: 1 },
});

export const RideModel: Model<IRideSchema> = mongoose.model<IRideSchema>(
  "RideModel",
  rideSchema
);

