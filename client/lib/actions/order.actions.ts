"use server";

import { redirect } from "next/navigation";
import { CheckoutOrderParams } from "../types";
import Stripe from "stripe";
import setupInterceptors from "../axios";
import axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:8080/api/orders/book-ride";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(order?.rate) * 100;

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
        distance: order.distance
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
    const response = await axios.post(baseUrl, order);
    // return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      return status;
    }
  } 
};
