import { Model } from "mongoose";
import { IOrderUsecase } from "../../adapters/interfaces/IOrderUsecases";
import { IOrderSchema } from "../../adapters/interfaces/IOrderSchema";
import { OrderEntity } from "../../entities/entity";

export class OrderRepository implements IOrderUsecase {
  constructor(private OrderModel: Model<IOrderSchema>) {}
  async createOrder(order: OrderEntity): Promise<any> {
    const newOrder = new this.OrderModel(order);
   return await newOrder.save();
  }
}
