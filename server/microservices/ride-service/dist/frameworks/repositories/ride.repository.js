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
exports.RideRepository = void 0;
class RideRepository {
    constructor(RideModel) {
        this.RideModel = RideModel;
    }
    createRide(rideData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRide = new this.RideModel(rideData);
            const rideRes = yield newRide.save();
            return rideRes;
        });
    }
    getAvailableRides() {
        return __awaiter(this, void 0, void 0, function* () {
            const allAvailableRides = yield this.RideModel.find();
            return allAvailableRides;
        });
    }
}
exports.RideRepository = RideRepository;
