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
                const createOrder = yield this.orderUsecase.createOrder(order);
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
                const allOrders = yield this.orderUsecase.getAllOrders();
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
                const { rideId, driverId, orderId } = order;
                const res1 = yield this.rabbitMq.fetchCompleteOrder(rideId, driverId);
                const res2 = yield this.orderUsecase.getSingleOrder(orderId);
                // const completeOrder = {
                //   ...res1,...res2
                // } 
                // console.log(completeOrder);
                // res.status(200).json(completeOrder);
            }
            catch (error) {
                res.status(500).send("Error while creating order");
                console.log("Error while creating order => ", error);
            }
        });
    }
}
exports.OrderController = OrderController;
