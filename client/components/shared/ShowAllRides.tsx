"use client";

import { fetchAllBookedRides } from "@/lib/actions/order.actions";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useAppSelector } from "@/lib/hooks";

const BookedRides = () => {
  interface bookedRide {
    _id: string;
    stripeId: string;
    rideId: string;
    userId: string;
    driverId: string;
    source: string;
    destination: string;
    distance: string;
    totalAmount: string;
    createdAt: Date;
    driverName?: string;
    driverPhoneNumber?: string;
    pickupTime?: Date;
    dropoffTime?: Date;
    date?: Date;
  }

  const existingUser: any = useAppSelector((state) => state?.auth?.user);
  let loggedUserId = "";
  if (existingUser) {
    const userWithUsername = existingUser as {
      _id: string;
    };
    loggedUserId = userWithUsername?._id;
  }
  
  const [bookedRides, setBookedRides] = useState<bookedRide[]>();
  useEffect(() => {
    const fetchAllRides = async () => {
      const res = await fetchAllBookedRides(loggedUserId);
      setBookedRides(res); 
      console.log(res);
    };

    fetchAllRides();
  }, []);

  return (
    <>
      <div className="wrapper grid md:grid-cols-3 grid-cols-1 gap-5">
        {bookedRides?.map((item, i) => (
          <OrderCard order={item} />
        ))}
      </div>
    </>
  );
};

export default BookedRides;
