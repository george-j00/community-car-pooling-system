"use client";

import CreateRideForm from "@/components/shared/CreateRide";
import MapBoxMap from "@/components/shared/map";


const page = () => {
 

  return (
    <>
      <section className="md:wrapper flex flex-col md:flex-row  w-full h-screen gap-10">
        <div className="w-full md:w-1/3">
          <CreateRideForm />
        </div>
        <div className="w-full md:w-2/3">
          <MapBoxMap />
        </div>
      </section>
    </>
  );
};

export default page;
