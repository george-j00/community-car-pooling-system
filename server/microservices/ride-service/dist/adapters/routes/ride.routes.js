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
exports.rideRouter = exports.RideRouter = void 0;
const express_1 = require("express");
const ride_controller_1 = require("../controllers/ride.controller");
const ride_usecase_1 = require("../../usecases/ride.usecase");
const ride_repository_1 = require("../../frameworks/repositories/ride.repository");
const ride_schema_1 = require("../../frameworks/models/ride.schema");
const rabbitmq_1 = require("../messageBroker/rabbitmq");
class RideRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.rideRepository = new ride_repository_1.RideRepository(ride_schema_1.RideModel);
        this.rideUsecase = new ride_usecase_1.RideUsecase(this.rideRepository);
        this.consumeMessage = new rabbitmq_1.rabbitmq(this.rideUsecase);
        this.controller = new ride_controller_1.RideController(this.rideUsecase);
        this.router.post("/api/rides/create-ride", (req, res) => {
            this.controller.create_ride(req, res);
        });
        this.router.post("/api/rides/search-rides", (req, res) => {
            this.controller.searchRides(req, res);
        });
        this.router.post("/api/rides/created-rides", (req, res) => {
            this.controller.getAllCreatedRides(req, res);
        });
    }
    rabbitMq() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumeMessage.fetchUserConsumer();
            yield this.consumeMessage.reduceSeatAvailable();
        });
    }
}
exports.RideRouter = RideRouter;
exports.rideRouter = new RideRouter().router;
