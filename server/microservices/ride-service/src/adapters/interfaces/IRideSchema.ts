import { Document } from "mongoose";


export interface IRideSchema extends Document {
  id?: string; 
  userId: string;
  source: string;
  destination: string;
  date: string;
  pickupTime: string;
  dropOffTime: string;
  distance: string;
  duration: string;
  rate: string;
  seatAvailable:number;
}
