import { Model } from "mongoose";
import { IRideUsecase } from "../../adapters/interfaces/IRideUsecases";
import { RideEntity } from "../../entities/entity";
import { RideModel } from "../models/ride.schema";
import { IRideSchema } from "../../adapters/interfaces/IRideSchema";

export class RideRepository implements IRideUsecase {
  constructor(private RideModel: Model<IRideSchema>) {}

  async createRide(rideData: RideEntity): Promise<any> {
    const newRide = new this.RideModel(rideData);
    const rideRes = await newRide.save();
    return rideRes;
  }
  async getAvailableRides(): Promise<RideEntity[]> {
    const allAvailableRides = await this.RideModel.find();
    return allAvailableRides;
  }
}
