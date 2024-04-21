import { OrderEntity } from "../../entities/entity";

export interface IOrderUsecase {
  createOrder(order: OrderEntity): Promise<any>;
  getAllOrders(): Promise<OrderEntity[]>;
  getSingleOrder(orderId:string): Promise<OrderEntity>;
}
