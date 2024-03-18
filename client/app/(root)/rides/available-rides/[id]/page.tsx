"use client";

import ViewRide from "@/components/shared/ViewRide";
import { fetchUserData } from "@/lib/actions/addCar.action";
import { setCompleteRideData } from "@/lib/features/ride/rideSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IRide } from "@/lib/types/IRide";
import React, { useEffect, useState } from "react";

type RideParams = {
  params: {
    id: string;
  };
};

const Page = ({ params: { id } }: RideParams) => {
  const dispatch = useAppDispatch();

  const allRides: IRide[] = useAppSelector((state) => state?.ride?.allRides);

  if (allRides === null) {
    console.log("No rides found.");
    return null;
  }

  const selectedRide = allRides.find((ride) => ride._id === id);

  if (!selectedRide) {
    console.log("Ride with id", id, "not found.");
    return null;
  }
  const userId = selectedRide?.userId;

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const res = await fetchUserData(userId);
        dispatch(setCompleteRideData({ ...selectedRide, ...res?.updatedUser }));
      };
      fetchData();
    }
  }, [userId]);

  return (
    <div className="wrapper">
      <ViewRide />
    </div>
  );
};

export default Page;
