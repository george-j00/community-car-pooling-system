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
import { useState } from "react";

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

  const handleSubmit = () => {
    console.log('*****' , completeRideData);
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="bg-black text-white p-4 w-[40vw] mt-10 rounded-full"
        >
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
          <p className="text-red-500 text-center mb-5">{count} seats are not available</p>
        )}
        <DialogFooter>
          <Button disabled={countError} onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
