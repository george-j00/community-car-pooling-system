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
exports.UserRepository = void 0;
class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new this.UserModel(user);
                console.log('this is newuser from rabbitmq ', newUser);
                yield newUser.save();
                console.log('user added successfully');
            }
            catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Registration failed");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserModel.findOne({ email: email }).exec();
                if (user && user.password === password) {
                    console.log('login successful');
                    return true;
                }
                else {
                    console.log('login failed');
                    return null;
                }
            }
            catch (error) {
                console.error("Login failed:", error);
                throw new Error("Login failed");
            }
        });
    }
}
exports.UserRepository = UserRepository;
