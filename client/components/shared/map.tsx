"use client";

import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppSelector } from "@/lib/hooks";

const MapBoxMap = () => {
  const userLocation = useAppSelector((state) => state?.auth?.userLocation);
  console.log("redux location", userLocation);

  return (
    <div className="flex items-center h-[75vh]">
      {
        userLocation ? 
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}
          initialViewState={{
            longitude: userLocation?.longitude,
            latitude: userLocation?.latitude,
            zoom: 14,
          }}
          style={{ width: 700, height: 500 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker longitude={userLocation?.longitude} latitude={userLocation?.latitude} anchor="bottom">
            <img className="w-1/2" src="/assets/images/marker-icon.png" />
          </Marker>
        </Map> : null
      }
    </div>
  );
};

export default MapBoxMap;
