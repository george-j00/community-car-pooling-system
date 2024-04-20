import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Map, { Marker } from "react-map-gl";

const LocationMarker = () => {
  const userLocation = useAppSelector((state) => state?.auth?.userLocation);
  const sourceCoordinators = useAppSelector(
    (state) => state?.ride?.sourceLocationCoordinator
  );
  const destinationCoordinators = useAppSelector(
    (state) => state?.ride?.destinationLocationCoordinator
  );

  return (
    <>
      {/* user coordinators  */}
      <Marker
        longitude={userLocation?.longitude}
        latitude={userLocation?.latitude}
        anchor="bottom"
      >
        <Image
          className="w-[50px]"
          src="/assets/images/marker-icon.png"
          width={1000}
          height={1000}
          alt="User Location"
        />
      </Marker>

      {/* source cooridinators */}
      {sourceCoordinators ? (
        <Marker
          longitude={sourceCoordinators?.longitude}
          latitude={sourceCoordinators?.latitude}
          anchor="bottom"
        >
          <label htmlFor="pickUp" className="font-bold">
            Pick up
          </label>
          <Image
            id="pickUp"
            className="w-[50px]"
            src="/assets/images/pickup marker.png"
            height={1000}
            width={1000}
            alt="Pick up marker"
          />
        </Marker>
      ) : null}

      {/* destinatin coordinators */}
      {destinationCoordinators ? (
        <Marker
          longitude={destinationCoordinators?.longitude}
          latitude={destinationCoordinators?.latitude}
          anchor="bottom"
        >
          <label htmlFor="dropOff" className="font-bold">
            Drop off
          </label>
          <Image
            id="dropOff"
            className="w-[50px]"
            src="/assets/images/dropOff.png"
            height={1000}
            width={1000}
            alt="Drop off Marker"
          />
        </Marker>
      ) : null}
    </>
  );
};

export default LocationMarker;
