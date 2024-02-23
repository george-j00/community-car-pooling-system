import mongoose, { Model } from "mongoose";
import { IUserSchema } from "../interfaces/IUserSchema";

const userSchema = new mongoose.Schema<IUserSchema>({
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  car: {
    carName: { type: String, required: true },
    type: { type: String },
    model: { type: String },
    capacity: { type: Number, min: 1, max: 6 },
    vehicleNumber: { type: String, minlength: 4 },
    fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric"] },
  },
});

export const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>(
  "UserModel",
  userSchema
);
