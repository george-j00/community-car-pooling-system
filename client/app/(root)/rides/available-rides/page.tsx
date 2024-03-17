'use client'

import RideCard from "@/components/shared/RideCard";
import { fetchAllAvailableRides } from "@/lib/actions/addCar.action"
import Link from "next/link";
import { useEffect, useState } from "react"

const page = () => {

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
      }

    const [allRides , setAllRides] = useState<IRide[]>([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
              const rides = await fetchAllAvailableRides(); 
              setAllRides(rides); 
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