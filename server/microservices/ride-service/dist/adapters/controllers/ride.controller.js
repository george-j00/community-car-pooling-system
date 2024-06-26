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
exports.RideController = void 0;
class RideController {
    constructor(rideUsecase) {
        this.rideUsecase = rideUsecase;
    }
    create_ride(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rideData = req.body;
                const createdRide = yield this.rideUsecase.createRide(rideData);
                res.status(200).json(createdRide);
            }
            catch (error) {
                res.status(500).send("Error while creating ride");
                console.log("Error while creating ride => ", error);
            }
        });
    }
    searchRides(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payload } = req.body;
                const availableRides = yield this.rideUsecase.searchRides(payload);
                res.status(200).json(availableRides);
            }
            catch (error) {
                res.status(500).send("Error while fetching all the available rides");
                console.log("Error while fetching available rides => ", error);
            }
        });
    }
    getAllCreatedRides(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const availableRides = yield this.rideUsecase.getAllCreatedRides(userId);
                res.status(200).json(availableRides);
            }
            catch (error) {
                res.status(500).send("Error while fetching all the available rides");
                console.log("Error while fetching available rides => ", error);
            }
        });
    }
}
exports.RideController = RideController;
