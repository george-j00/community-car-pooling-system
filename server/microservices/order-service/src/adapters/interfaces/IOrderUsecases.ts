import { OrderEntity } from "../../entities/entity";

export interface IOrderUsecase {
  createOrder(order: OrderEntity): Promise<any>;
}
