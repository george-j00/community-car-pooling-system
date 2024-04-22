import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchCompleteData } from "@/lib/actions/order.actions";
import { useEffect, useState } from "react";
import { FcInternal } from "react-icons/fc";

interface bookedRide {
  order: {
    _id: string;
    stripeId: string;
    rideId: string;
    userId: string;
    driverId: string;
    source: string;
    destination: string;
    distance: string;
    totalAmount: string;
    createdAt: Date;
  };
}
interface RideData {
  Driver: string;
  Pickup_time: string;
  DropOff_time: string;
  Ride_Date: string;
  driver_mobile: string;
  driver_Licence: string;
  car: string;
  Car_number: string;
}


const OrderCard = ({ order }: bookedRide) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRide, setSelectedRide] = useState<RideData>();

  const { rideId, driverId, _id } = order;
  const payload = {
    rideId,
    driverId,
    _id,
  };

  const handleClick = async () => {
    setIsOpen(true);
    const res = await fetchCompleteData(payload);
    setSelectedRide(res);
    console.log('the complete booked ride data ',res);
  };

  return (
    <>
      <div
        className="bg-gray-700 text-white p-4 rounded-lg flex hover:bg-gray-800 cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-3xl mt-2">
          <FcInternal />
        </div>
        <div className="flex flex-col ml-3">
          <p>{order?.source}</p>
          <p>{order?.destination}</p>
          <p>{order?.distance} Km</p>
          <p>₹ {order?.totalAmount}</p>
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
                <p>{order?.source}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Destination:</p>
                <p>{order?.destination}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Distance:</p>
                <p>{order?.distance} Km</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Total Amount:</p>
                <p>₹ {order?.totalAmount}</p>
              </div>
                <div className="flex items-center justify-between">
                  <p>Ride Date:</p>
                  <p>{selectedRide?.Ride_Date}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Pickup Time:</p>
                  <p>{selectedRide?.Pickup_time.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Dropoff Time:</p>
                  <p>{selectedRide?.DropOff_time.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Car:</p>
                  <p>{selectedRide?.car}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Vehicle Number :</p>
                  <p>{selectedRide?.Car_number}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Driver Name:</p>
                  <p>{selectedRide?.Driver}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Driver Mobile:</p>
                  <p>{selectedRide?.driver_mobile}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Driver's DL ID :</p>
                  <p>{selectedRide?.driver_Licence}</p>
                </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderCard;
