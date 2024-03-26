import { Router, Request, Response } from "express";
import { RideController } from "../controllers/ride.controller";
import { RideUsecase } from "../../usecases/ride.usecase";
import { RideRepository } from "../../frameworks/repositories/ride.repository";
import { RideModel } from "../../frameworks/models/ride.schema";


export class RideRouter {
  router = Router();

  rideRepository = new RideRepository(RideModel)
  rideUsecase = new RideUsecase(this.rideRepository)
  controller = new RideController(this.rideUsecase)

  constructor() {
    this.router.post("/api/rides/create-ride",(req: Request, res: Response) => {
            this.controller.create_ride(req, res)
      }
    );
    this.router.post("/api/rides/search-rides",(req: Request, res: Response) => {
            this.controller.searchRides(req, res)
      }
    );
  }

}

export const rideRouter = new RideRouter().router;
