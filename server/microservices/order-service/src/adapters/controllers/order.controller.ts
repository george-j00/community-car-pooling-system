import { Request, Response } from "express";
import { OrderUsecase } from "../../usecases/order.usecase";
import { RabbitMQService } from "../messageBroker/rabbitmq";

export class OrderController {
  constructor(private orderUsecase: OrderUsecase , private rabbitMq: RabbitMQService) {}

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
  async getAllOrders(req: Request, res: Response) {
    try {
      const allOrders = await this.orderUsecase.getAllOrders();
      res.status(200).json(allOrders);
    } catch (error) {
      res.status(500).send("Error while creating order");
      console.log("Error while creating order => ", error);
    }
  }
  async getSingleOrder(req: Request, res: Response) {
    try {
      const order = req.body 
      const {rideId , driverId , orderId} = order
      const res1 = await this.rabbitMq.fetchCompleteOrder(rideId , driverId)
      const res2 = await this.orderUsecase.getSingleOrder(orderId);
      // const completeOrder = {
      //   ...res1,...res2
      // } 
      // console.log(completeOrder);
       
      // res.status(200).json(completeOrder);
    } catch (error) {
      res.status(500).send("Error while creating order");
      console.log("Error while creating order => ", error);
    }
  }
}
