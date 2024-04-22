import { OrderEntity } from "../../entities/entity";

export interface IOrderUsecase {
  createOrder(order: OrderEntity): Promise<any>;
  getAllOrders(loggedUserId:string): Promise<OrderEntity[]>;
  getSingleOrder(orderId:string): Promise<OrderEntity>;
  getPassengersList(rideId:string , driverId:string): Promise<any>;
}
