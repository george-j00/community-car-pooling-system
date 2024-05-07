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
exports.UserController = void 0;
class UserController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
    }
    add_car(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { carData, userId } = req.body;
                yield this.userUsecase.add_car(userId, carData);
                res.status(200).send("Address added successfully");
            }
            catch (error) {
                res.status(500).send("Error while adding address");
                console.log("Error while adding => ", error);
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userUsecase.getAllUsers();
                res.status(200).json({ users });
            }
            catch (error) {
                res.status(500).send("Error while adding address");
                console.log("Error while adding => ", error);
            }
        });
    }
    banUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                console.log(userId);
                const response = yield this.userUsecase.banUser(userId);
                if (response) {
                    res.status(200).json({ updated: response });
                }
            }
            catch (error) {
                res.status(500).send("Error while adding address");
                console.log("Error while adding => ", error);
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, data } = req.body;
                console.log(userId, data);
                const response = yield this.userUsecase.updateProfile(userId, data);
                if (response) {
                    res.status(200).json({ updatedUser: response });
                }
            }
            catch (error) {
                res.status(500).send("Error while adding address");
                console.log("Error while adding => ", error);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const response = yield this.userUsecase.getUser(userId);
                if (response) {
                    res.status(200).json({ updatedUser: response });
                }
            }
            catch (error) {
                res.status(500).send("Error while adding address");
                console.log("Error while adding => ", error);
            }
        });
    }
}
exports.UserController = UserController;
