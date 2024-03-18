import { Request, Response } from "express";
import { RideUsecase } from "../../usecases/ride.usecase";

export class RideController {
  constructor(private rideUsecase: RideUsecase) {}

  async create_ride(req: Request, res: Response) {
    try {
      const  rideData  = req.body;
      const createdRide = await this.rideUsecase.createRide(rideData);
      res.status(200).json(createdRide)
    } catch (error) {
      res.status(500).send("Error while creating ride");
      console.log("Error while creating ride => ", error);
    }
  }
  async getAllAvailableRides(req: Request, res: Response) {
    try {
      const availableRides = await this.rideUsecase.getAvailableRides();
      res.status(200).json(availableRides)
    } catch (error) {
      res.status(500).send("Error while fetching all the available rides");
      console.log("Error while fetching available rides => ", error);
    }
  }

}
