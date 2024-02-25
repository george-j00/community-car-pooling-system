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
        this.login_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.authUsecase.login(email, password);
                if (token !== null) {
                    res.status(200).json({ token });
                }
                else {
                    res.status(401).json({ error: "Login failed" });
                    console.log("Login failed for user:", email);
                }
            }
            catch (error) {
                res.status(500).send("Error while adding User");
                console.log("Error while adding => ", error);
            }
        });
    }
    otpGenerator() {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = otp_generator_1.default.generate(4, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true,
            });
            const generatedOtp = +otp;
            return generatedOtp;
        });
    }
    register_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const saltRounds = 10;
                const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
                const OTP = yield this.otpGenerator();
                const payload = {
                    username,
                    email,
                    password: hashedPassword,
                    otp: OTP,
                };
                yield (0, nodemailer_1.sendEmail)(email, OTP);
                yield this.authUsecase.register(payload);
                res.status(200).send('otp sent successfully');
            }
            catch (error) {
                res.status(500).send("Error while sending the otp");
                console.log("Error while adding => ", error);
            }
        });
    }
    validateOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const userData = yield this.authUsecase.validateOtp(email, otp);
                console.log('userDAta is sent to client ', userData);
                res.status(200).json({ user: userData });
            }
            catch (error) {
                res.status(401).send('otp validation failed');
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const otp = yield this.otpGenerator();
                console.log('resened', email, otp);
                yield (0, nodemailer_1.sendEmail)(email, otp);
                yield this.authUsecase.resendOtp(email, otp);
                console.log('otp resend succssfull ');
                // res.status(200); 
            }
            catch (error) {
                res.status(401).send('otp validation failed');
            }
        });
    }
}
exports.AuthController = AuthController;
