'use client'

import RideCard from "@/components/shared/RideCard";
import { fetchAllAvailableRides } from "@/lib/actions/addCar.action"
import { setAllRidesAvail } from "@/lib/features/ride/rideSlice";
import { useAppDispatch } from "@/lib/hooks";
import { IRide } from "@/lib/types/IRide";
import Link from "next/link";
import { useEffect, useState } from "react"

const page = () => {

    

    const [allRides , setAllRides] = useState<IRide[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchRides = async () => {
            try {
              const rides = await fetchAllAvailableRides(); 
              setAllRides(rides); 
              dispatch(setAllRidesAvail(rides));
            } catch (error) {
              console.error("Error fetching rides:", error);
            }
          };
      
          fetchRides();
    }, [])
    
  return (
    <>
        <h1 className="flex justify-center text-3xl mt-5">Available rides </h1>

    <div className="wrapper flex flex-col md:flex-row gap-5">
      {allRides.map((ride, i)  => (
         <Link href={`/rides/available-rides/${ride._id}`}>
             <RideCard key={i} ride={ride} />
         </Link>
      ))}
    </div>
    </>
  )
}

export default page