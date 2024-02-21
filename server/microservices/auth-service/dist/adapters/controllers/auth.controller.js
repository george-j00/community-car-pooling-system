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
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = require("../../frameworks/nodemailer/nodemailer");
class AuthController {
    constructor(authUsecase) {
        this.authUsecase = authUsecase;
    }
    register_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const saltRounds = 10;
                const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
                const generatedOtp = +otp_generator_1.default.generate(4, {
                    upperCaseAlphabets: false,
                    specialChars: false,
                    lowerCaseAlphabets: false,
                    digits: true,
                });
                const payload = {
                    username,
                    email,
                    password: hashedPassword,
                    otp: generatedOtp,
                };
                //   await this.authUsecase.register(payload);
                yield (0, nodemailer_1.sendEmail)(email, generatedOtp);
                //   res.status(200).send('Address added successfully');
            }
            catch (error) {
                res.status(500).send("Error while adding address");
                console.log("Error while adding => ", error);
            }
        });
    }
}
exports.AuthController = AuthController;