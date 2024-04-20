"use client";

import React, { useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import LocationMarker from "./Marker";
import axios from "axios";
import { setDirections } from "@/lib/features/ride/rideSlice";
import Directions from "./Directions";
import ShowDistanceTime from "./ShowDistanceTime";

const MapBoxMap = () => {
  const userLocation = useAppSelector((state) => state?.auth?.userLocation);
  const sourceCoordinators = useAppSelector(
    (state) => state?.ride?.sourceLocationCoordinator
  );
  const destinationCoordinators = useAppSelector(
    (state) => state?.ride?.destinationLocationCoordinator
  );
  const directions: any = useAppSelector((state) => state?.ride?.directions);
  console.log(directions);

  const mapRef = useRef<any>();
  const dispatch = useAppDispatch();

  const getRouteDirections = async (dispatch : any) => {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${
        sourceCoordinators?.longitude +
        "," +
        sourceCoordinators?.latitude +
        ";" +
        destinationCoordinators?.longitude +
        "," +
        destinationCoordinators?.latitude
      }?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiZ2VvcmdlLTExMSIsImEiOiJjbHRvZ2ZqODYwZW5vMmpxcHFlNjkwaGtsIn0.AkhsFFqi-1k9-DykHEI26g`
    );
    if (res) {
      dispatch(setDirections(res?.data));
    }
    console.log(res?.data);
  };

  useEffect(() => {
    if (sourceCoordinators && destinationCoordinators) {
      getRouteDirections(dispatch);
    }
  }, [sourceCoordinators, destinationCoordinators, dispatch]);

  return (
    <>
      <div className="flex items-center h-[75vh]">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}
            initialViewState={{
              longitude: userLocation?.longitude,
              latitude: userLocation?.latitude,
              zoom: 14,
            }}
            style={{ width: 700, height: 500 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <LocationMarker />

            {directions?.routes?.length > 0 ? (
              <Directions
                coordinates={directions?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>

      <div className="">
        <ShowDistanceTime directions={directions?.routes} />
      </div>
    </>
  );
};

export default MapBoxMap;
