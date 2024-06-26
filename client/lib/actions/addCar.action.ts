"use server"

import axios, { AxiosError } from "axios";
import setupInterceptors from "../axios";
import { getCookie } from "./auth";

type carDataParams = {
  carName: string;
  type?: string | undefined;
  model?: string | undefined;
  capacity: number;
  vehicleNumber: string;
  fuelType: "Petrol" | "Diesel" | "Electric";
};

type searchTermParams = {
  pickUpLocation: string;
  dropOffLocation: string;
};

const baseUrl = "http://localhost:8080/api/users/add-car";
const baseUrl2 = "http://localhost:8080/api/users/user/update-profile";
const baseUrl3 = "http://localhost:8080/api/rides";
const baseUrl5 = "http://localhost:8080/api/users/getUser";

export const addCarDetails = async (
  addCarDetails: carDataParams,
  userId: string
) => {
  try {
    const payload = {
      carData: addCarDetails,
      userId: userId,
    };
    await setupInterceptors();
    const response = await axios.post(baseUrl, payload);
    return response?.status;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  }
};

export const updateProfile = async (data: any, userId: string) => {
  try {
    const payload = {
      data: data,
      userId: userId,
    };

    await setupInterceptors();
    const response = await axios.post(baseUrl2, payload);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  }
};
export const createRide = async (rideData: any) => {
  try {
    console.log("the payloaddddd", rideData);

    await setupInterceptors();
    const response = await axios.post(`${baseUrl3}/create-ride`, rideData);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  }
};
export const fetchAllAvailableRides = async (
  source: string,
  destination: string
) => {
  try {
    // await setupInterceptors()
    const payload = {
      source,
      destination,
    };

    console.log("fetch ride payloaddd", payload);

    const response = await axios.post(`${baseUrl3}/search-rides`, { payload });
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  }
};
export const fetchUserData = async (userId: string) => {
  try {
    console.log("user id on the fetch user data ", userId);

    await setupInterceptors();
    const response = await axios.get(`${baseUrl5}/${userId}`);
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  }
};
export const fetchCreatedRides = async (userId:string) => {
  try {
    // await setupInterceptors()
    const response = await axios.post(`${baseUrl3}/created-rides`, { userId:userId });
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  }
};