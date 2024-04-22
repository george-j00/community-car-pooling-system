import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  fetchCompleteData,
  fetchPassengerData,
} from "@/lib/actions/order.actions";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { FcInternal } from "react-icons/fc";
import { Button } from "../ui/button";

interface IRide {
  ride: {
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
  };
}

const ViewRideDetails = ({ ride }: IRide) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRide, setSelectedRide] = useState<any>();

  // const { rideId, driverId, _id } = passengers;

  // const payload = {
  //   rideId,
  //   driverId,
  //   _id,
  // };

  const handleClick = async () => {
    setIsOpen(true);
    const rideId = ride?._id;
    const driverId = ride?.userId;    
    const res = await fetchPassengerData(rideId,driverId);
    //   setSelectedRide(res);
    //   console.log('the complete booked ride data ',res);
  };

  return (
    <>
      <div className="bg-gray-700 text-white p-4 rounded-lg flex ">
        <div className="text-3xl mt-2">
          <FcInternal />
        </div>
        <div className="flex flex-col ml-3">
          <p>{ride?.source}</p>
          <p>{ride?.destination}</p>
          <p>{ride?.distance} Km</p>
          <p>₹ {ride?.rate}</p>

          <Button
            className="mt-2 w-[200px] rounded-lg hover:bg-gray-800 cursor-pointer"
            onClick={handleClick}
          >
            View Passengers
          </Button>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Source:</p>
                <p>{"sourcee"}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewRideDetails;
