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
}
exports.UserUsecase = UserUsecase;
