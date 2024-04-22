"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { fetchCreatedRides } from "@/lib/actions/addCar.action";
import ViewRideDetails from "./ViewPassengers";

const CreatedRides = () => {

    interface IRide {
        _id: string;
        userId: string;
        source: string;
        destination: string;
        date: string;
        pickupTime: string;
        dropOffTime: string;
        distance: string;
        duration: string;
        rate: string;
        seatAvailable: number;
    }

  const existingUser: any = useAppSelector((state) => state?.auth?.user);
  let loggedUserId = "";
  if (existingUser) {
    const userWithUsername = existingUser as {
      _id: string;
    };
    loggedUserId = userWithUsername?._id;
  }
  
  const [createdRides, setCreatedRides] = useState<IRide[]>();

  useEffect(() => {
    const fetchAllRides = async () => {
      const res = await fetchCreatedRides(loggedUserId);
      setCreatedRides(res);
      console.log('created ridess',res);
    };

    fetchAllRides();
  }, []);

  return (
    <>
      <div className="wrapper grid md:grid-cols-3 grid-cols-1 gap-5">
        {createdRides?.map((item, i) => (
          <ViewRideDetails ride={item} />
        ))}
      </div>
    </>
  );
};

export default CreatedRides;
