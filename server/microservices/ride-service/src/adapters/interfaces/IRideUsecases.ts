import { RideEntity } from "../../entities/entity";

export interface IRideUsecase {
  createRide(rideData: RideEntity): Promise<any>;
  getAvailableRides(): Promise<RideEntity[]>;
}
