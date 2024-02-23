import { Document } from "mongoose";

export interface IUserSchema extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  car: {
    carName: string;
    type: string;
    model: string;
    capacity: number;
    vehicleNumber: string;
    fuelType: "Petrol" | "Diesel" | "Electric";
  };
  createdAt: Date;
  updatedAt: Date;
}
