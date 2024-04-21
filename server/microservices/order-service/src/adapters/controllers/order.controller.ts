import { Request, Response } from "express";
import { OrderUsecase } from "../../usecases/order.usecase";

export class OrderController {
  constructor(private orderUsecase: OrderUsecase) {}

  async create_order(req: Request, res: Response) {
    try {
      // console.log('this is req body order ', req.body);
      
      const order = req.body;
      const createOrder = await this.orderUsecase.createOrder(order);
      res.status(200).json(createOrder);
    } catch (error) {
      res.status(500).send("Error while creating order");
      console.log("Error while creating order => ", error);
    }
  }
}
