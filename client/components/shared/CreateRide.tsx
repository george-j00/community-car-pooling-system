"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDestinationLocationCoordinator, setSourceLocationCoordinator } from "@/lib/features/ride/rideSlice";
import { useAppSelector } from "@/lib/hooks";
import { getCookie } from "@/lib/actions/auth";
import { createRide } from "@/lib/actions/addCar.action";
import { useRouter } from "next/navigation";

type rideData = {

    distance: string;
    duration: string;
    rate: string;
    userId: string;
    date: string;
    pickupTime: string;
    dropOffTime: string;
    source: string;
    destination: string;
    seatAvailable:number;
}
function RideCreationForm() {

  const [formError, setFormError] = useState(false);
  const [sourceSearchTerm, setSourceSearchTerm] = useState<string>("");
  const [desitinationSearchTerm, setDestinationSearchTerm] = useState<string>("");
  const [sourceLocation, setSourceLocation] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [sourceAddressSuggestions, setSourceAddressSuggestions] = useState<string[]>([]);
  const [destinationAddressSuggestions, setDestinationAddressSuggestions] = useState<string[]>([]);


  const directions: any = useAppSelector((state) => state?.ride?.directions);
  let userId  = "";
  let seatAvailable = 0
  const user = useAppSelector((state) => state?.auth?.user);

  if (user) {
    const userWithUsername = user as {
      _id: string;
      car:{
        capacity: number;
      }
    };
    userId = userWithUsername?._id;
   if ( userWithUsername?.car) {
    seatAvailable = userWithUsername?.car?.capacity;
   }
  }
  
  const distance =  directions?.routes?.length > 0 ? directions?.routes[0].distance/1000 : 0 ;
  const duration =  directions?.routes?.length > 0 ? directions?.routes[0].duration/3600 : 0 ;
  const rate = distance ? distance * 40 : 0 ;

  if (distance) {
    console.log('create ride directions',distance,duration);
  }
  
  const [formData, setFormData] = useState({
    date: "",
    pickupTime: "",
    dropOffTime: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const debouncefn = setTimeout(() => {
      if (sourceSearchTerm) {
        getAddressSuggestions(sourceSearchTerm, "Source");
      }
    }, 500);

    return () => clearTimeout(debouncefn);
  }, [sourceSearchTerm]);

  useEffect(() => {
    const debouncefn = setTimeout(() => {
      if (desitinationSearchTerm) {
        getAddressSuggestions(desitinationSearchTerm, "Destination");
      }
    }, 500);

    return () => clearTimeout(debouncefn);
  }, [desitinationSearchTerm]);

  // suggestions 
  const getAddressSuggestions = async (searchTerm: any, type: string) => {
    const res: any = await axios.get(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchTerm}&language=en&session_token=06d2aee0-e7c0-4e31-88e3-7bac081020ba&access_token=pk.eyJ1IjoiZ2VvcmdlLTExMSIsImEiOiJjbHRvZ2ZqODYwZW5vMmpxcHFlNjkwaGtsIn0.AkhsFFqi-1k9-DykHEI26g`
    );
    const suggestions = res?.data?.suggestions;
    if (type === "Source") {
      setSourceAddressSuggestions(suggestions)
    }
    if (type === "Destination") {
      setDestinationAddressSuggestions(suggestions)
    }
    console.log(suggestions);
  };
  
  const handleSourceAddressClick = async (item:any) => {
    setSourceLocation(item?.name), 
    setSourceAddressSuggestions([])
    console.log(item?.mapbox_id);
    await retriveLocationData(item?.mapbox_id,"Source");
    
  }

  const handleDestinationAddressClick =async (item:any) => {
     setDestinationLocation(item?.name),
     setDestinationAddressSuggestions([])
     console.log(item?.mapbox_id);
    await retriveLocationData(item?.mapbox_id ,"Destination");
  } 

  const retriveLocationData = async(mapboxId:string , type:string) => {
    const res : any = await axios.get(`https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}?session_token=088fc758-62ce-4041-88e3-93a911a08bc9&access_token=pk.eyJ1IjoiZ2VvcmdlLTExMSIsImEiOiJjbHRvZ2ZqODYwZW5vMmpxcHFlNjkwaGtsIn0.AkhsFFqi-1k9-DykHEI26g`)
    
    if (type === 'Source') {
      console.log('source',res?.data?.features?.[0].geometry?.coordinates);
      const coordinates :any = res?.data?.features?.[0].geometry?.coordinates
      dispatch(setSourceLocationCoordinator(coordinates))
    }
    if (type === 'Destination') {
      console.log('destination',res?.data?.features?.[0].geometry?.coordinates);
      const coordinates :any = res?.data?.features?.[0].geometry?.coordinates
      dispatch(setDestinationLocationCoordinator(coordinates))
    }
  }


    const handleChange = (e : any) => {
      const { name, value } = e.target;
      // Update the corresponding state based on the input field name
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));      
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
    
      if (!sourceLocation || !destinationLocation || !formData.date || !formData.pickupTime || !formData.dropOffTime || !distance || !duration) {
        setFormError(true)
        return;
      }else{
        setFormError(false)
      }
    
      const rate = distance * 40;
    
      const rideData : rideData = {
        source: sourceLocation,
        destination: destinationLocation,
        ...formData,
        distance: distance.toFixed(2),
        duration: duration.toFixed(2),
        rate: rate.toFixed(2) ,
        userId:userId,
        seatAvailable:seatAvailable
      };

      const res = await createRide(rideData)

      if (res) {
        router.push(`/profile/created-rides`)
      }
    };
    

  return (
    <form>
      <div className="flex gap-5 flex-col  items-center justify-center h-[80vh]">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="source">Where from ? </Label>
          <Input
            type="text"
            id="source"
            placeholder="Source"
            value={sourceSearchTerm}
            onChange={(e) => setSourceSearchTerm(e.target.value)}
            required
          />
          {
            sourceAddressSuggestions &&  sourceAddressSuggestions.map ((item:any , index:number) => (
              <div key={index} className="border p-4 shadow-md hover:bg-gray-100 cursor-pointer" onClick={() => {handleSourceAddressClick(item)} }>
              <p>{item?.name} {item?.full_address}</p>
            </div>
            ))
          }
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="destination">Where to ? </Label>
          <Input
            type="text"
            id="destination"
            placeholder="Destination"
            value={desitinationSearchTerm}
            onChange={(e) => setDestinationSearchTerm(e.target.value)}
            required
          />
 {
            destinationAddressSuggestions &&  destinationAddressSuggestions.map ((item:any , index:number) => (
              <div key={index} className="border p-4 shadow-md hover:bg-gray-100 cursor-pointer" onClick={() => {handleDestinationAddressClick(item)}}>
              <p>{item?.name}</p>
            </div>
            ))
          }
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="date">Date </Label>
          <Input
            name="date"
            type="date"
            id="date"
            placeholder="Date"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pickupTime">Pickup Time</Label>
          <Input
            name="pickupTime"
            type="time"
            id="pickupTime"
            placeholder="Pickup Time"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="dropOffTime">Drop-off Time</Label>
          <Input
            name="dropOffTime"
            type="time"
            id="dropOffTime"
            placeholder="Drop-off Time"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="totalCharge">Total Charge ₹</Label>
          <Input
            name="totalCharge"
            type="number"
            id="totalCharge"
            value={rate.toFixed(2)}
            required
            disabled
          />
        </div>

        {formError ? <p className="text-red-500">Some data is missing. Please fill all the required fields.</p> : ""}
        <Button className="w-2/3 mt-5" onClick={handleSubmit}>Create Ride</Button>
      </div>
    </form>
  );
}

export default RideCreationForm;
