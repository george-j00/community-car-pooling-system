"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUsecase = void 0;
class AuthUsecase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    register(authCredentials) {
        return this.authRepository.register(authCredentials);
    }
    login(email, password) {
        throw new Error("Method not implemented.");
    }
}
exports.AuthUsecase = AuthUsecase;
