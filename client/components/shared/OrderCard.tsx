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
    _id:string;
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

const OrderCard = ({ order }: bookedRide) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [bookedRides, setBookedRides] = useState<bookedRide[]>();
  
  const {rideId , driverId, _id } = order
   const payload = {
        rideId ,
        driverId,
        _id
  }
  useEffect(() => {
    const fetchAllRides = async () => {
      const res = await fetchCompleteData(payload);
      setBookedRides(res);
      console.log(res);
    };

    fetchAllRides();
  }, []);

  return (
    <>
      <div
        className="bg-gray-800 text-white p-4 rounded-lg flex hover:bg-gray-900 cursor-pointer"
        onClick={() => setIsOpen(true)}
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
                <p>{order?.source}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Distance:</p>
                <p>{order?.distance} Km</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Total Amount:</p>
                <p>₹ {order?.totalAmount}</p>
              </div>
              {/* {driverName && (
                <div className="flex items-center justify-between">
                  <p>Driver Name:</p>
                  <p>{driverName}</p>
                </div>
              )} */}
              {/* {driverPhoneNumber && (
                <div className="flex items-center justify-between">
                  <p>Driver Phone Number:</p>
                  <p>{driverPhoneNumber}</p>
                </div>
              )}
              {pickupTime && (
                <div className="flex items-center justify-between">
                  <p>Pickup Time:</p>
                  <p>{pickupTime.toLocaleString()}</p>
                </div>
              )}
              {dropoffTime && (
                <div className="flex items-center justify-between">
                  <p>Dropoff Time:</p>
                  <p>{dropoffTime.toLocaleString()}</p>
                </div>
              )}
              {date && (
                <div className="flex items-center justify-between">
                  <p>Date:</p>
                  <p>{date.toLocaleDateString()}</p>
                </div>
              )} */}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderCard;
