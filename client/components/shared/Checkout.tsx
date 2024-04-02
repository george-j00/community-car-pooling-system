import React, { useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';

import { ICompleteRide } from '@/lib/types/ICompleteRide';
import { useAppSelector } from '@/lib/hooks';

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = () => {

    let userId = "";
    const user = useAppSelector((state) => state?.auth?.user);
    if (user) {
      const userWithUsername = user as {
        _id: string;
      };
      userId = userWithUsername?._id;
    }
    const completeRideData : ICompleteRide  = useAppSelector(
        (state) => state?.ride?.completeRideData
      );

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     if (query.get('success')) {
//       console.log('Order placed! You will receive an email confirmation.');
//     }

//     if (query.get('canceled')) {
//       console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
//     }
//   }, []);

  const onCheckout = async () => {
    const order = {
      source: completeRideData?.source,
      destination: completeRideData?.destination,
      distance: completeRideData?.distance,
      driverId: completeRideData?.userId,
      userId:userId,
      rideId:completeRideData?.rideId,
      charge:completeRideData?.rate
    };

  console.log('the ride order ',order);

  };
  

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button  bg-black text-white p-4 w-[40vw] mt-10 rounded-full">
        Book Seat
      </Button>
    </form>
  )
}

export default Checkout