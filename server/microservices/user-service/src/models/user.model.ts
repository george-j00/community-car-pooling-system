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
});

export const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>(
  "UserModel",
  userSchema
);
