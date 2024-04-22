import { Router, Request, Response } from "express";
import { OrderRepository } from "../../frameworks/repositories/order.repository";
import { OrderModel } from "../../frameworks/models/order.schema";
import { OrderUsecase } from "../../usecases/order.usecase";
import { OrderController } from "../controllers/order.controller";
import { RabbitMQService } from "../messageBroker/rabbitmq";

export class OrderRouter {
  router = Router();

  orderRepository = new OrderRepository(OrderModel);
  orderUsecase = new OrderUsecase(this.orderRepository);
  rabbitMq = new RabbitMQService();
  controller = new OrderController(this.orderUsecase, this.rabbitMq);

  constructor() {
    this.router.post("/api/orders/book-ride", (req: Request, res: Response) => {
      this.controller.create_order(req, res);
    });
    this.router.post("/api/orders/getAllOrders",(req: Request, res: Response) => {
        this.controller.getAllOrders(req, res);
      });
    this.router.post("/api/orders/getCompleteData", (req: Request, res: Response) => {
      this.controller.getSingleOrder(req, res);
    });
    this.router.post("/api/orders/get-passengers-list", (req: Request, res: Response) => {
      this.controller.getPassengersList(req, res);
    });
  }
}

export const orderRouter = new OrderRouter().router;
