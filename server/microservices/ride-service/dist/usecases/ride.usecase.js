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
    searchRides(searchParams) {
        return this.rideRepository.searchRides(searchParams);
    }
    getRideById(rideId) {
        return this.rideRepository.getRideById(rideId);
    }
    getAllCreatedRides(userId) {
        return this.rideRepository.getAllCreatedRides(userId);
    }
    reduceSeatAvailable(data) {
        return this.rideRepository.reduceSeatAvailable(data);
    }
}
exports.RideUsecase = RideUsecase;
