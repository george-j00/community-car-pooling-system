"use client";

import { fetchAllBookedRides } from "@/lib/actions/order.actions";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

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

  const [bookedRides, setBookedRides] = useState<bookedRide[]>();
  useEffect(() => {
    const fetchAllRides = async () => {
      const res = await fetchAllBookedRides();
      setBookedRides(res);
      console.log(res);
    };

    fetchAllRides();
  }, []);

  return (
    <>
      <div className="wrapper flex gap-10">
        {bookedRides?.map((item, i) => (
          <OrderCard order={item} />
        ))}
      </div>
    </>
  );
};

export default BookedRides;
