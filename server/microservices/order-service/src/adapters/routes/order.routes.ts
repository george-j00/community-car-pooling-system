import { Router, Request, Response } from "express";
import { OrderRepository } from "../../frameworks/repositories/order.repository";
import { OrderModel } from "../../frameworks/models/order.schema";
import { OrderUsecase } from "../../usecases/order.usecase";
import { OrderController } from "../controllers/order.controller";

export class OrderRouter {
  router = Router();

  orderRepository = new OrderRepository(OrderModel);
  orderUsecase = new OrderUsecase(this.orderRepository);
  controller = new OrderController(this.orderUsecase);

  constructor() {
    this.router.post("/api/orders/book-ride", (req: Request, res: Response) => {
      this.controller.create_order(req, res);
    });
  }
}

export const orderRouter = new OrderRouter().router;
