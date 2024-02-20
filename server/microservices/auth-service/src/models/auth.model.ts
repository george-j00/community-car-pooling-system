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
    expires: "1m",
  },
});

export const AuthModel: Model<IAuthSchema> = mongoose.model<IAuthSchema>(
  "AuthModel",
  authSchema
);
