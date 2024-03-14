import { useAppSelector } from "@/lib/hooks";
import Map, { Marker } from "react-map-gl";

const LocationMarker = () => {
  const userLocation = useAppSelector((state) => state?.auth?.userLocation);
  const sourceCoordinators = useAppSelector((state) => state?.ride?.sourceLocationCoordinator);
  const destinationCoordinators = useAppSelector((state) => state?.ride?.destinationLocationCoordinator);
    
  return (
    <>

    {/* user coordinators  */}
      <Marker
        longitude={userLocation?.longitude}
        latitude={userLocation?.latitude}
        anchor="bottom"
      >
        <img className="w-[50px]" src="/assets/images/marker-icon.png" />
      </Marker> 
    

    {/* source cooridinators */}
      {
        sourceCoordinators ? <Marker
        longitude={sourceCoordinators?.longitude}
        latitude={sourceCoordinators?.latitude}
        anchor="bottom"
      >
        <img className="w-[50px]" src="/assets/images/pickup marker.png" />
      </Marker>  : null
      }
      {
        destinationCoordinators ? <Marker
        longitude={destinationCoordinators?.longitude}
        latitude={destinationCoordinators?.latitude}
        anchor="bottom"
      >
        <img className="w-[50px]" src="/assets/images/dropOff.png" />
      </Marker>  : null
      }
    </>
  );
};

export default LocationMarker;
