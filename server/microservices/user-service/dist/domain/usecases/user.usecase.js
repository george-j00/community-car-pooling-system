"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUsecase = void 0;
class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(user) {
        return this.userRepository.register(user);
    }
    checkUserExistence(email) {
        return this.userRepository.checkUserExistence(email);
    }
    login(email, password) {
        return this.userRepository.login(email, password);
    }
    add_car(userId, addCarData) {
        return this.userRepository.add_car(userId, addCarData);
    }
    getAllUsers() {
        return this.userRepository.getAllUsers();
    }
    banUser(userId) {
        return this.userRepository.banUser(userId);
    }
    updateProfile(userId, data) {
        return this.userRepository.updateProfile(userId, data);
    }
    getUser(userId) {
        return this.userRepository.getUser(userId);
    }
    getPassengersData(passengersList) {
        return this.userRepository.getPassengersData(passengersList);
    }
}
exports.UserUsecase = UserUsecase;
