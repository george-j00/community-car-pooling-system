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

 async getAllOrders(loggedUserId:string): Promise<OrderEntity[]> {
    const allOrders = await this.OrderModel.find({userId:loggedUserId}); 
    return allOrders;
  }
 async getSingleOrder(orderId : string): Promise<any> {
    const order = await this.OrderModel.findById(orderId); 
    return order;
  }
  async getPassengersList(rideId: string, driverId: string): Promise<any> {
   const users = await this.OrderModel.find({driverId:driverId , rideId:rideId},{_id:0,userId:1})

   console.log('the userss list',users);
    
  } 
} 
