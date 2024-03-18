"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideUsecase = void 0;
class RideUsecase {
    constructor(rideRepository) {
        this.rideRepository = rideRepository;
    }
    createRide(rideData) {
        return this.rideRepository.createRide(rideData);
    }
    getAvailableRides() {
        return this.rideRepository.getAvailableRides();
    }
}
exports.RideUsecase = RideUsecase;
