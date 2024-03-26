"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRouter = exports.RideRouter = void 0;
const express_1 = require("express");
const ride_controller_1 = require("../controllers/ride.controller");
const ride_usecase_1 = require("../../usecases/ride.usecase");
const ride_repository_1 = require("../../frameworks/repositories/ride.repository");
const ride_schema_1 = require("../../frameworks/models/ride.schema");
class RideRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.rideRepository = new ride_repository_1.RideRepository(ride_schema_1.RideModel);
        this.rideUsecase = new ride_usecase_1.RideUsecase(this.rideRepository);
        this.controller = new ride_controller_1.RideController(this.rideUsecase);
        this.router.post("/api/rides/create-ride", (req, res) => {
            this.controller.create_ride(req, res);
        });
        this.router.post("/api/rides/search-rides", (req, res) => {
            this.controller.searchRides(req, res);
        });
    }
}
exports.RideRouter = RideRouter;
exports.rideRouter = new RideRouter().router;
