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
import axios from "axios";

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

interface IPassenger {
  username: string;
  phoneNumber: string;
}

const ViewRideDetails = ({ ride }: IRide) => {
  const [isOpen, setIsOpen] = useState(false);

  const [passengersList, setPassengersList] = useState<IPassenger[]>();

  const rideId = ride?._id;
  const driverId = ride?.userId;

  const handleClick = async () => {
    try {
      setIsOpen(true);
      // const res = await fetchPassengerData(rideId,driverId);
      const res = await axios.post(
        "http://localhost:8080/api/orders/get-passengers-list",
        { rideId: rideId, driverId: driverId }
      );
      console.log('passengers response ',res?.data);
      
      setPassengersList(res?.data);
    } catch (error) {
      console.log(error);
    }
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
            <DialogTitle>Booked Passengers</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
              {passengersList &&  passengersList.length > 0 ?  passengersList?.map((passenger, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <p className="font-bold">{passenger.username}</p>
                <p>{passenger.phoneNumber}</p>
              </div>
              )) : ( <> 
                <p>No Seats are booked yet </p>
              </> )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewRideDetails;
