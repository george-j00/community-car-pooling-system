"use client";

import RideCard from "@/components/shared/RideCard";
import { fetchAllAvailableRides } from "@/lib/actions/addCar.action";
import { setAllRidesAvail } from "@/lib/features/ride/rideSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IRide } from "@/lib/types/IRide";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const Page = () => {

  const rides : IRide[] = useAppSelector((state) => state?.ride?.allRides);

  console.log("available ridess",rides);
  
  return (
    <>
      <h1 className="flex justify-center text-3xl mt-5">Available rides </h1>
      <div className="wrapper flex flex-col md:flex-row gap-5">
        {rides?.map((ride, i) => (
          <Link key={i} href={`/rides/available-rides/${ride._id}`}>
            <RideCard ride={ride} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Page;
