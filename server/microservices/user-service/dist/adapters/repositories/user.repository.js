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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../../models/user.model");
class UserRepository {
    constructor(UserModel, Jwt) {
        this.UserModel = UserModel;
        this.Jwt = Jwt;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new this.UserModel(user, { new: true });
                console.log("this is newuser from rabbitmq ", newUser);
                yield newUser.save();
                console.log("user added successfully");
            }
            catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Registration failed");
            }
        });
    }
    checkUserExistence(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingData = yield this.UserModel.findOne({ email: email });
                if (existingData) {
                    console.log("Email already exists");
                    return existingData;
                }
                return null;
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
                if (user) {
                    const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
                    if (passwordMatch) {
                        console.log('Login successful');
                        return user;
                    }
                    else {
                        console.log('Password mismatch');
                        return false;
                    }
                }
                else {
                    console.log('User not found');
                    return false;
                }
            }
            catch (error) {
                console.error("Login failed:", error);
                throw new Error("Login failed");
            }
        });
    }
    add_car(userId, addCarDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user_model_1.UserModel.findByIdAndUpdate(userId, { $set: { car: addCarDetails } })
                    .then(updatedUser => {
                    if (updatedUser) {
                        console.log("User car details updated successfully!");
                    }
                    else {
                        console.log("User not found or update failed!");
                    }
                });
            }
            catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Registration failed");
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield this.UserModel.find({}, { password: 0 });
                console.log("get all user details ", allUsers);
                return allUsers;
            }
            catch (error) {
                console.error("Fetching all users failed:", error);
                throw new Error("Error while fetching all users");
            }
        });
    }
    banUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banUser = yield this.UserModel.findById(userId);
                if (banUser) {
                    banUser.status = banUser.status === "active" ? "banned" : "active";
                }
                const newUser = yield (banUser === null || banUser === void 0 ? void 0 : banUser.save());
                console.log('User ban/unblock success', newUser);
                return newUser === null || newUser === void 0 ? void 0 : newUser.status;
            }
            catch (error) {
                console.error("Error while banning user:", error);
                throw new Error("Error while banning user");
            }
        });
    }
}
exports.UserRepository = UserRepository;
