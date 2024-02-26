import mongoose, { Model } from "mongoose";
import { IAuthSchema } from "../interfaces/IAuthSchema";

const authSchema = new mongoose.Schema<IAuthSchema>({
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
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

authSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }); // Adjust for desired time

export const AuthModel: Model<IAuthSchema> = mongoose.model<IAuthSchema>(
  "AuthModel",
  authSchema
);
