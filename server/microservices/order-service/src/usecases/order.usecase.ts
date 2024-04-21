import { IOrderUsecase } from "../adapters/interfaces/IOrderUsecases";
import { OrderEntity } from "../entities/entity";
import { OrderRepository } from "../frameworks/repositories/order.repository";

export class OrderUsecase implements IOrderUsecase {
  constructor(private orderRepository: OrderRepository) {}
  createOrder(order: OrderEntity): Promise<any> {
    return this.orderRepository.createOrder(order);
  }

  getAllOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.getAllOrders();
  }
  getSingleOrder(orderId:string): Promise<OrderEntity> {
    return this.orderRepository.getSingleOrder(orderId);
  }
}
 