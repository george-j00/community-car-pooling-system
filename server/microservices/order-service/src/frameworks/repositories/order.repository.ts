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

 async getAllOrders(): Promise<OrderEntity[]> {
    const allOrders = await this.OrderModel.find(); 
    return allOrders;
  }
 async getSingleOrder(orderId : string): Promise<any> {
    const order = await this.OrderModel.findById(orderId); 
    return order;
  }
}
