"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setAllRidesAvail } from "@/lib/features/ride/rideSlice";
import { fetchAllAvailableRides } from "@/lib/actions/addCar.action";

const SearchRide = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isRidesAvail, setIsRidesAvail] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSearch = async  () => {
   
   const res =  await fetchAllAvailableRides(pickupLocation , dropoffLocation);
  //  dispatch(setAllRidesAvail())
  if (res?.length === 0) {
    setIsRidesAvail(false);
    console.log('No available ridess');
  }else{
      dispatch(setAllRidesAvail(res))
     router.push(
      `/rides/available-rides`
    );
    console.log('available ridess');
    setIsRidesAvail(true);
  }
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="button rounded-full md:w-[200px]  font-bold bg-white text-black hover:bg-black hover:text-white hover:border">
            {" "}
            Search ride
            <svg
              width="55"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mb-14">
          <DrawerHeader>
            <DrawerTitle className="text-center">Search Ride </DrawerTitle>
          </DrawerHeader>
          <div className="flex justify-center">
            <div className="bg-gray-100  text-black flex flex-col md:flex-row md:w-[80%] space-y-4 md:space-y-0 md:space-x-4 p-4 rounded-2xl">
              <div className="flex flex-row gap-5 items-center">
                <Label
                  htmlFor="source_location"
                  className="text-right font-bold text-md"
                >
                  Pickup location
                </Label>
                <Input
                  id="source_location"
                  className="col-span-3 input-field w-[210px] ml-8 md:ml-[15px] bg-white"
                  type="text"
                  placeholder="Pick up location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-5 items-center">
                <Label
                  htmlFor="destination_location"
                  className="text-right font-bold text-md"
                >
                  Drop-off location
                </Label>
                <Input
                  id="destination_location"
                  className="col-span-3 input-field w-[210px] ml-5 md:ml-1"
                  type="text"
                  placeholder="Drop-off location"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <Button className="w-[300px]" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        {!isRidesAvail && <p className="text-center text-red-500">No rides available </p>}

        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchRide;
