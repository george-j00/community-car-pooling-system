import { UserCredentials } from "@/types/IFormFields";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth/register";
const loginUrl = "http://localhost:3001/api/auth/login";
const otpUrl = "http://localhost:3001/api/auth/register/send-otp";

export const userRegistration = async (credentials: UserCredentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    if (response.status === 200) {
      const { email } = credentials;
      return email; // Return the email upon successful registration
    }
  } catch (error) {
    console.error("Error occurred during registration:", error);
  }
};

export const sendOtp = async (email: string, otp: number) => {
  const data = {
    email: email,
    otp: otp,
  };

  try {
    const response = await axios.post(otpUrl, data);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error occured during sending otp :", error);
  }
};

type LoginCredentials = {
    email:string;
    password:string;
}
export const userLogin = async (userData : LoginCredentials) => {
    const res =  await axios.post(loginUrl , userData);
    console.log(res);
}
