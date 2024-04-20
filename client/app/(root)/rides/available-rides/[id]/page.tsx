"use client";

import ViewRide from "@/components/shared/ViewRide";
import { fetchUserData } from "@/lib/actions/addCar.action";
import { setCompleteRideData } from "@/lib/features/ride/rideSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IRide } from "@/lib/types/IRide";
import React, { useEffect } from "react";

type RideParams = {
  params: {
    id: string;
  };
};

const Page = ({ params: { id } }: RideParams) => {
  const dispatch = useAppDispatch();
  const allRides: IRide[] = useAppSelector((state) => state?.ride?.allRides);
  const selectedRide = allRides.find((ride) => ride._id === id);
  
  useEffect(() => {
    if (allRides === null || !selectedRide) {
      console.log("No rides found or ride not found.");
      return;
    }

    const userId = selectedRide?.userId;
    const rideId = id;

    if (userId) {
      const fetchData = async () => {
        const res = await fetchUserData(userId);
        dispatch(setCompleteRideData({ ...selectedRide, rideId, ...res?.updatedUser }));
      };
      fetchData();
    }
  }, [id, allRides, selectedRide, dispatch]);

  if (allRides === null) {
    return null;
  }

  if (!selectedRide) {
    return null;
  }

  return (
    <div className="wrapper">
      <ViewRide />
    </div>
  );
};

export default Page;
