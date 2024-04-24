import { Router, Request, Response } from "express";
import { RideController } from "../controllers/ride.controller";
import { RideUsecase } from "../../usecases/ride.usecase";
import { RideRepository } from "../../frameworks/repositories/ride.repository";
import { RideModel } from "../../frameworks/models/ride.schema";
import { rabbitmq } from "../messageBroker/rabbitmq";


export class RideRouter {
  router = Router();

  rideRepository = new RideRepository(RideModel)
  rideUsecase = new RideUsecase(this.rideRepository)
  consumeMessage = new rabbitmq(this.rideUsecase)
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
    this.router.post("/api/rides/created-rides",(req: Request, res: Response) => {
            this.controller.getAllCreatedRides(req, res)
      }
    );
  }

  async rabbitMq() {
   await this.consumeMessage.fetchUserConsumer();
   await this.consumeMessage.reduceSeatAvailable();
  }
}

export const rideRouter = new RideRouter().router;
