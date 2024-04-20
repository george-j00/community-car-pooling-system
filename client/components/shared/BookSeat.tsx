import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import Checkout from "./Checkout";

export function BookSeat({ completeRideData }: any) {
  const capacity = completeRideData?.seatAvailable;

  const [count, setCount] = useState<number>(1);
  const [countError, setCountError] = useState<boolean>(false);

  const handleCountChange = (e: any) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setCount(newValue);
      // Check for error immediately on change
      setCountError(newValue > capacity || newValue < 1);
    }
  };

  const onCheckout = () => {
    const payload = {
      source: completeRideData?.source,
      destination: completeRideData?.destination,
      rate: completeRideData?.rate,
      rideId: completeRideData?.rideId,
      userId: completeRideData?.userId,
      distance: completeRideData?.distance,
      duration: completeRideData?.duration,
    };

    console.log("ride confirm payload", payload);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-full mt-2 w-72">
          Book seat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm seat</DialogTitle>
          <DialogDescription>
            Enter number of passengers for the ride
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="count" className="text-right">
              Count
            </Label>
            <Input
              id="count"
              className="col-span-3"
              type="number"
              value={count}
              onChange={handleCountChange}
            />
          </div>
        </div>
        {countError && (
          <p className="text-red-500 text-center mb-5">
            {count} seats are not available
          </p>
        )}
        <DialogFooter>
          {/* <Button disabled={countError} onClick={onCheckout}>

          </Button> */}
          <Checkout disable={countError}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
