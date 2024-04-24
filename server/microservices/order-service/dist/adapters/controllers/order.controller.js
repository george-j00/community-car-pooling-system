"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
class OrderController {
    constructor(orderUsecase, rabbitMq) {
        this.orderUsecase = orderUsecase;
        this.rabbitMq = rabbitMq;
    }
    create_order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('this is req body order ', req.body);
                const order = req.body;
                const { bookedSeatsCount, rideId } = order;
                const createOrder = yield this.orderUsecase.createOrder(order);
                if (createOrder) {
                    this.rabbitMq.reduceSeatAvailability(bookedSeatsCount, rideId);
                }
                res.status(200).json(createOrder);
            }
            catch (error) {
                res.status(500).send("Error while creating order");
                console.log("Error while creating order => ", error);
            }
        });
    }
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                console.log('loggeeddd usserr idd', userId);
                const allOrders = yield this.orderUsecase.getAllOrders(userId);
                res.status(200).json(allOrders);
            }
            catch (error) {
                res.status(500).send("Error while creating order");
                console.log("Error while creating order => ", error);
            }
        });
    }
    getSingleOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = req.body;
                console.log('order', order);
                // _id is the order id 
                const { rideId, driverId, _id } = order;
                const response = yield this.rabbitMq.fetchCompleteOrder(rideId, driverId);
                const bookedSeatCount = yield this.orderUsecase.getSingleOrder(_id);
                const { username, pickupTime, dropOffTime, date, phoneNumber, driverLicenseNumber, car } = response;
                const { carName, vehicleNumber } = car;
                const completeRideData = { Driver: username, Pickup_time: pickupTime, DropOff_time: dropOffTime, Ride_Date: date, driver_mobile: phoneNumber, driver_Licence: driverLicenseNumber, car: carName, Car_number: vehicleNumber, bookedSeatCount: bookedSeatCount };
                console.log('complete ride data', completeRideData);
                res.status(200).json(completeRideData);
            }
            catch (error) {
                res.status(500).send("Error while creating order");
                console.log("Error while creating order => ", error);
            }
        });
    }
    getPassengersList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const response = await this.rabbitMq.fetchCompleteOrder()
                // const res2 = await this.orderUsecase.getSingleOrder(_id);
                const { rideId, driverId } = req.body;
                const response = yield this.orderUsecase.getPassengersList(rideId, driverId);
                const passengersData = yield this.rabbitMq.fetchPassengersData(response);
                res.status(200).json(passengersData);
            }
            catch (error) {
                res.status(500).send("Error while creating order");
                console.log("Error while creating order => ", error);
            }
        });
    }
}
exports.OrderController = OrderController;
