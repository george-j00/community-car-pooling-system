"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
// import ShowSuggestionsBox from "./ShowSuggestionsBox";


function RideCreationForm() {

  const [formError, setFormError] = useState(false);

  const [sourceSearchTerm, setSourceSearchTerm] = useState<string>("");
  const [desitinationSearchTerm, setDestinationSearchTerm] = useState<string>("");

  const [sourceLocation, setSourceLocation] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");

  const [sourceAddressSuggestions, setSourceAddressSuggestions] = useState<string[]>([]);
  const [destinationAddressSuggestions, setDestinationAddressSuggestions] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    pickupTime: "",
    arrivalTime: "",
  });

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
    }
    if (type === 'Destination') {
      console.log('destination',res?.data?.features?.[0].geometry?.coordinates);
    }
  
  }


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
              <div key={index} className="border p-4 shadow-md hover:bg-gray-100 cursor-pointer" onClick={() => {handleSourceAddressClick(item)}}>
              <p>{item?.name}</p>
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

        {formError ? <p className="text-red-500">Complete form</p> : ""}
        <Button className="w-2/3 mt-5">Create Ride</Button>
      </div>
    </form>
  );
}

export default RideCreationForm;
