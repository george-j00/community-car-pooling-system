import { IRideUsecase } from "../adapters/interfaces/IRideUsecases";
import { RideEntity } from "../entities/entity";
import { RideRepository } from "../frameworks/repositories/ride.repository";

export class RideUsecase implements IRideUsecase {
  constructor(private rideRepository: RideRepository) {}

  createRide(rideData: RideEntity): Promise<any> {
    return this.rideRepository.createRide(rideData);
  } 
  searchRides(searchParams:any): Promise<RideEntity[]> {
    return this.rideRepository.searchRides(searchParams);
  } 
}
 