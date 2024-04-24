import { RideEntity } from "../../entities/entity";

export interface IRideUsecase {
  createRide(rideData: RideEntity): Promise<any>;
  searchRides(source:string,destination:string): Promise<RideEntity[]>;
  getRideById(rideId:string): Promise<RideEntity>;
  getAllCreatedRides(userId:string): Promise<RideEntity[]>;
  reduceSeatAvailable(data:any): Promise<void>;
}
