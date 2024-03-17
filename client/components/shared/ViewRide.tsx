import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

import CompleteRideData from "./CompleteRideData";

const ViewRide = () => {
  const completeRideData = useAppSelector(
    (state) => state?.ride?.completeRideData
  );
  console.log("completeRideData", completeRideData);

  return (
    <>
   <section className="wrapper justify-center bg-primary-50 bg-dotted-pattern bg-contain">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Use grid layout for responsiveness */}
    <div className="flex flex-col items-center"> {/* Center image vertically */}
      <Image
        src={"/assets/images/carImage.png"}
        alt="car image"
        width={1000}
        height={1000}
        className="flex h-[400px] mt-14 object-cover object-center"
      />

      <Button
        size="lg"
        className="button mt-10 rounded-full w-full font-bold bg-black text-white hover:bg-white hover:text-black hover:border"
      >
        Book seat
      </Button>
    </div>

    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-2xl">Complete Ride Details</h2>
        <CompleteRideData ride={completeRideData} />
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default ViewRide;
