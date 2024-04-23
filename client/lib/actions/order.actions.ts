"use server";

import { redirect } from "next/navigation";
import { CheckoutOrderParams } from "../types";
import Stripe from "stripe";
import setupInterceptors from "../axios";
import axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:8080/api/orders/";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


  const price = Number(order?.rate) * 100 / 4;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: price,
            product_data: {
              name: `${order.source} to  ${order.destination}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        rideId: order.rideId,
        userId: order.userId,
        driverId: order.driverId,
        source: order.source,
        destination: order.destination,
        distance: order.distance,
        bookedSeatsCount: order.bookedSeatsCount,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/rides`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: any) => {
  try {
    // console.log("the order payyyloooadddd111", order);

    // await setupInterceptors();
    const response = await axios.post(`${baseUrl}/book-ride`, order);
    // return response?.data;
    
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  } 
};

export const fetchAllBookedRides = async (loggedUserId:string) => {
  try {
    // await setupInterceptors();

    console.log('booked ride user id ',loggedUserId);
    
    const response = await axios.post(`${baseUrl}/getAllOrders`,{userId:loggedUserId});
    return response?.data;
    
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  } 
};

type ICompleteParams ={
  rideId:string;
  driverId:string;
  _id:string;
}

export const fetchCompleteData = async (payload : ICompleteParams) => {
  try {
    // await setupInterceptors();
    const response = await axios.post(`${baseUrl}/getCompleteData`,payload);
    return response?.data;
    
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  } 
};

export const fetchPassengerData = async (rideId : string , driverId:string) => {
  try {
    // await setupInterceptors();
    const response = await axios.post(`${baseUrl}/get-passengers-list`,{rideId:rideId, driverId:driverId});
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  } 
};



