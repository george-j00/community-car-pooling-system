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
  async searchRides(searchParams: any): Promise<RideEntity[]> {
    try {
      const source = searchParams?.source;
      const destination = searchParams?.destination;
      
      const allAvailableRides = await this.RideModel.find({
        source: { $regex: new RegExp("^" + source, "i") },
        destination: { $regex: new RegExp("^" + destination, "i") },
      });
      console.log("all available rides:", allAvailableRides);
      return allAvailableRides;
    } catch (error) {
      console.error("Error fetching rides:", error);
      throw error;
    }
  }
  async getRideById(rideId : string) : Promise<any> {
    try {
      const ride = await this.RideModel.findById(rideId)
      return ride
    } catch (error) {
      console.error("Error fetching ride:", error);
      throw new Error("Error fetching ride");
    }
  }
  async getAllCreatedRides(userId : string) : Promise<any> {
    try {
      const ride = await this.RideModel.find({userId: userId});
      return ride
    } catch (error) {
      console.error("Error fetching created rides:", error);
      throw new Error("Error fetching ride");
    }
  }

 async reduceSeatAvailable(data: any): Promise<void> {
    const { rideId , seatCount } =  data 
  console.log('ride id and seat count ',rideId,seatCount);
  
    const newRide = await this.RideModel.findById(rideId)
    if (newRide && newRide?.seatAvailable) {
      newRide.seatAvailable -= seatCount;
    }
    await newRide?.save();
    console.log('reduces seat availability',newRide);
  }

}
