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
    searchRides(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const source = searchParams === null || searchParams === void 0 ? void 0 : searchParams.source;
                const destination = searchParams === null || searchParams === void 0 ? void 0 : searchParams.destination;
                const allAvailableRides = yield this.RideModel.find({
                    source: { $regex: new RegExp("^" + source, "i") },
                    destination: { $regex: new RegExp("^" + destination, "i") },
                });
                console.log("all available rides:", allAvailableRides);
                return allAvailableRides;
            }
            catch (error) {
                console.error("Error fetching rides:", error);
                throw error;
            }
        });
    }
    getRideById(rideId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ride = yield this.RideModel.findById(rideId);
                return ride;
            }
            catch (error) {
                console.error("Error fetching ride:", error);
                throw new Error("Error fetching ride");
            }
        });
    }
    getAllCreatedRides(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ride = yield this.RideModel.find({ userId: userId });
                return ride;
            }
            catch (error) {
                console.error("Error fetching created rides:", error);
                throw new Error("Error fetching ride");
            }
        });
    }
    reduceSeatAvailable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rideId, seatCount } = data;
            console.log('ride id and seat count ', rideId, seatCount);
            const newRide = yield this.RideModel.findById(rideId);
            if (newRide && (newRide === null || newRide === void 0 ? void 0 : newRide.seatAvailable)) {
                newRide.seatAvailable -= seatCount;
            }
            yield (newRide === null || newRide === void 0 ? void 0 : newRide.save());
            console.log('reduces seat availability', newRide);
        });
    }
}
exports.RideRepository = RideRepository;
