import { RideEntity } from "../../entities/entity";

export interface IRideUsecase {
  createRide(rideData: RideEntity): Promise<any>;
  searchRides(source:string,destination:string): Promise<RideEntity[]>;
}
