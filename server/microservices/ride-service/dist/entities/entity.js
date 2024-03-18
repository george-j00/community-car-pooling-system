"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideEntity = void 0;
class RideEntity {
    constructor(id, userId, source, destination, date, pickupTime, dropOffTime, distance, duration, rate) {
        this.id = id;
        this.userId = userId;
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.pickupTime = pickupTime;
        this.dropOffTime = dropOffTime;
        this.distance = distance;
        this.duration = duration;
        this.rate = rate;
    }
}
exports.RideEntity = RideEntity;
