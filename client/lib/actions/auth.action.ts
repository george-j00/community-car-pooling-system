

import { UserCredentials } from "@/types/IFormFields"
import axios from "axios"
import { redirect } from "next/navigation"

const baseUrl = 'http://localhost:3001/api/auth/register'
const otpUrl = 'http://localhost:3001/api/auth/register/send-otp'

export const userRegistration = async (credentials : UserCredentials)  => {
    try {
        const response = await axios.post(baseUrl, credentials);
        if (response.status === 200) {
            const { email } = credentials;
            return email; // Return the email upon successful registration
        }
    } catch (error) {
        console.error("Error occurred during registration:", error);
    }

}

type sendOtpParams = {
    email:string;
    otp:number;
}
export const sendOtp = async (data : sendOtpParams)  => {
    try {
        const response = await axios.post(otpUrl, data);
        if (response.status === 200) {
            return true; // Return the email upon successful registration
        }
    } catch (error) {
        console.error("Error occured during sending otp :", error);
    }

}