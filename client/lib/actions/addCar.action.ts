import axios, { AxiosError } from "axios";
import { useAppDispatch, useAppSelector, useAppStore } from "../hooks";
import { setLogout } from "../features/auth/authSlice";
import setupInterceptors from "../axios";


type carDataParams = {
  carName: string;
  type?: string | undefined;
    model?: string | undefined;
  capacity: number;
  vehicleNumber: string;
  fuelType: "Petrol" | "Diesel" | "Electric";
};

const baseUrl = "http://localhost:8080/api/users/add-car";
const baseUrl2 = "http://localhost:8080/api/users/user/update-profile";

export const addCarDetails = async (addCarDetails: carDataParams , userId : string, token:string) => {
  try {
    const payload = {
      carData : addCarDetails , 
      userId:userId,
    }
    await setupInterceptors(token)
    const response = await axios.post(baseUrl, payload);
    return response?.status
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status
    }
  }
};
export const updateProfile = async (data: any , token : string, userId:string) => {
  try {
    const payload = {
      data : data , 
      userId:userId,
    }
    await setupInterceptors(token)
    const response = await axios.post(baseUrl, payload);
    return response?.status
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status
    }
  }
};


