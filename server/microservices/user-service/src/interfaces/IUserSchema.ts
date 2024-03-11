import { Document } from "mongoose";

export interface IUserSchema extends Document {
  id: string;
  username: string;
  email: string;
  phoneNumber: Number;
  password: string;
  status:"active"| "banned"
  driverLicenseNumber: string;
  car: {
    carName: string;
    type: string;
    model: string;
    capacity: number;
    vehicleNumber: string;
    fuelType: "Petrol" | "Diesel" | "Electric";
  };
  profileCompletionStatus:"Complete" | "Incomplete" ,
  createdAt: Date;
  updatedAt: Date;
}
