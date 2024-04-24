import { Request, Response } from "express";
import { OrderUsecase } from "../../usecases/order.usecase";
import { RabbitMQService } from "../messageBroker/rabbitmq";

export class OrderController {
  constructor(private orderUsecase: OrderUsecase , private rabbitMq: RabbitMQService) {}

  async create_order(req: Request, res: Response) {
    try {
      // console.log('this is req body order ', req.body);
      
      const order = req.body;
      const { bookedSeatsCount , rideId } = order;
      const createOrder = await this.orderUsecase.createOrder(order);
      if (createOrder) {
        this.rabbitMq.reduceSeatAvailability(bookedSeatsCount , rideId)
      }
      res.status(200).json(createOrder);
    } catch (error) {
      res.status(500).send("Error while creating order");
      console.log("Error while creating order => ", error);
    }
  }
  async getAllOrders(req: Request, res: Response) {
    try {
      const  {userId} = req.body
      console.log('loggeeddd usserr idd',userId);
      const allOrders = await this.orderUsecase.getAllOrders(userId);
      res.status(200).json(allOrders);
    } catch (error) {
      res.status(500).send("Error while creating order");
      console.log("Error while creating order => ", error);
    }
  }
  async getSingleOrder(req: Request, res: Response) {
    try {
      const order = req.body 
      console.log('order',order);
      
      // _id is the order id 
      const {rideId , driverId , _id} = order 
      const response = await this.rabbitMq.fetchCompleteOrder(rideId , driverId)
      const bookedSeatCount = await this.orderUsecase.getSingleOrder(_id);
      const {username,pickupTime ,dropOffTime, date ,phoneNumber ,driverLicenseNumber, car} = response 
      const {carName ,vehicleNumber } = car 
      const completeRideData = {Driver:username, Pickup_time:pickupTime,DropOff_time:dropOffTime ,Ride_Date:date,driver_mobile:phoneNumber,driver_Licence:driverLicenseNumber, car:carName,Car_number:vehicleNumber ,bookedSeatCount : bookedSeatCount}

      console.log('complete ride data',completeRideData);
      res.status(200).json(completeRideData);
    } catch (error) {
      res.status(500).send("Error while creating order");
      console.log("Error while creating order => ", error);
    }
  }
  async getPassengersList(req: Request, res: Response) {
    try {
      // const response = await this.rabbitMq.fetchCompleteOrder()
      // const res2 = await this.orderUsecase.getSingleOrder(_id);
      const { rideId , driverId } = req.body
      const response = await this.orderUsecase.getPassengersList(rideId , driverId)
       const passengersData = await this.rabbitMq.fetchPassengersData(response)       
      res.status(200).json(passengersData);
    } catch (error) {
      res.status(500).send("Error while creating order");
      console.log("Error while creating order => ", error);
    }
  }
}
