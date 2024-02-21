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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'gj816373@gmail.com',
                pass: 'oykvaqiekefunsfp',
            },
        });
        console.log(otp, 'OTP');
        const mailOptions = {
            from: 'gj816373@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error); // Reject the promise if there is an error
            }
            else {
                console.log('Email sent successfully:', info.response);
                resolve(info.response); // Resolve the promise if email is sent successfully
            }
        });
    });
});
exports.sendEmail = sendEmail;
