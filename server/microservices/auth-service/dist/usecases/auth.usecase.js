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
exports.AuthUsecase = void 0;
class AuthUsecase {
    constructor(authRepository, rabbitmqService, jwt) {
        this.authRepository = authRepository;
        this.rabbitmqService = rabbitmqService;
        this.jwt = jwt;
    }
    register(authCredentials) {
        return this.authRepository.register(authCredentials);
    }
    validateOtp(email, otp) {
        return this.authRepository.validateOtp(email, otp);
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = {
                email: email,
                password: password,
            };
            const token = yield this.rabbitmqService.publicLoginCredentials(credentials);
            // console.log('validationResponse in auth usecase', loginResponse);
            // if (loginResponse !== null ) {
            //   const token = this.jwt.generateToken(email);
            //   console.log("token generated", token);
            //   return token;
            // }
            return token;
        });
    }
}
exports.AuthUsecase = AuthUsecase;
