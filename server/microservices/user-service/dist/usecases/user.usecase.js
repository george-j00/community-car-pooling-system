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
    login(email, password) {
        return this.userRepository.login(email, password);
    }
}
exports.UserUsecase = UserUsecase;
