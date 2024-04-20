import { Model } from "mongoose";
import { IOrderUsecase } from "../../adapters/interfaces/IOrderUsecases";
import { IOrderSchema } from "../../adapters/interfaces/IOrderSchema";
import { OrderEntity } from "../../entities/entity";


export class OrderRepository implements IOrderUsecase {
  constructor(private OrderModel: Model<IOrderSchema>) {}
  createOrder(order: OrderEntity): Promise<any> {

    console.log('the created order',order);
    
    throw new Error("Method not implemented.");
  }
}
