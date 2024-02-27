import { UserCredentials } from "@/types/IFormFields";
import axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:3001/api/auth/register";
const loginUrl = "http://localhost:3001/api/auth/login";
const otpUrl = "http://localhost:3001/api/auth/register/send-otp";
const resendOtpUrl = "http://localhost:3001/api/auth/register/resend-otp";

export const userRegistration = async (credentials: UserCredentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    if (response.status === 200) {
      const { email } = credentials;
      return email; 
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorMessage = axiosError.response.data
      return errorMessage;
    }
  }
};

export const sendOtp = async (email: string, otp: number) => {
  const data = {
    email: email,
    otp: otp,
  };

  try {
    const response = await axios.post(otpUrl, data);
    console.log("User data from the backend:", response.data);
    if (response.status === 200) {
      console.log('User data from the backend ',response);
      return response.data;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorMessage = axiosError.response.data
      return errorMessage;
    }
  }
};

export const resendOtp = async (email:string) => {
  try {
    const data = {
      email: email,
    }    
    await axios.post(resendOtpUrl, data);
  } catch (error) {
    console.log('Error on resending otp',error);
  }
};

type LoginCredentials = {
  email: string;
  password: string;
};

export const userLogin = async (userData: LoginCredentials) => {
  try {
    const response = await axios.post(loginUrl, userData);
    if (response.status === 200) {
      return response?.data
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return "Invalid login credentials";
    }
  }

};
