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
  phoneNumber: {
    type: String,
  },
  profileCompletionStatus:{
    type: String, enum: ["Complete", "Incomplete"],
    default: "Incomplete",
  },
  password: {
    type: String,
    required: true,
  },
  driverLicenseNumber:{
    type: String,
  },
  car: {
    carName: { type: String},
    type: { type: String },
    model: { type: String },
    capacity: { type: Number, min: 1, max: 6 },
    vehicleNumber: { type: String, minlength: 4 },
    fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric"] },
  },
  status: {
    type: String,
    enum: ["active", "banned"],
    default: "active",
  },
});

export const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>(
  "UserModel",
  userSchema
);
