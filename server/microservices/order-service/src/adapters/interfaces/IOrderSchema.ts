import { Document } from "mongoose";


export interface IOrderSchema extends Document {
    stripeId: string;
    rideId: string;
    userId: string;
    driverId: string;
    source: string;
    destination: string;
    distance: string;
    totalAmount: string;
    createdAt: Date;
  }