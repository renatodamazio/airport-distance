/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import DirectionRender from "./DirectionRender";
import PolylineDistance from "../polyline/Polyline";

import { useSelector, useDispatch, batch } from "react-redux";

import { setMapLoad } from "../../store/reducers/maps";
import { calcKilometers, calcNauticalMiles } from "../../utils/distance";

import {
  setDistance,
  setNautical,
  setDuration,
  setSteps,
  setKilometers,
  setStartAddress,
  setEndAddress,
} from "../../store/reducers/distances";
const containerStyle = {
  width: "800px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const [mapKey, setMapKey] = useState<number>(0);
  const [map, setMap] = useState<any>("");
  const [makers, setMakers] = useState<any>("");

  const dispatch = useDispatch();

  const { origin, destination } = useSelector(
    (state: any) => state.coordenates
  );

  const places = [origin, destination];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCjkCjzb4MdOpgMh8DSBXg3hfhnzH6cGJo",
    libraries: ["geometry", "drawing"],
  });

  const CalcDirections = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const data = result?.routes[0].legs[0];

          const distance_in_km = calcKilometers(
            origin.lat,
            origin.lng,
            destination.lat,
            destination.lng
          );
          const distance_in_nm = calcNauticalMiles(
            origin.lat,
            origin.lng,
            destination.lat,
            destination.lng
          );

          batch(() => {
            dispatch(setDistance(data?.distance?.text));
            dispatch(setNautical(distance_in_nm));
            dispatch(setKilometers(distance_in_km));
            dispatch(setDuration(data?.duration?.text));
            dispatch(setSteps(data?.steps));
            dispatch(setStartAddress(data?.start_address));
            dispatch(setEndAddress(data?.end_address));
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    return <></>
  };

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds();
    let mkr: any = "";

    for (var i = 0; i < places.length; i++) {
      mkr = new google.maps.Marker({
        position: new google.maps.LatLng(places[i], places[i]),
        map: map,
      });

      bounds.extend(mkr.position);
    }

    map.fitBounds(bounds);
    setMap(map);

    dispatch(setMapLoad(true));
  }, []);

  const onUnmount = useCallback(function callback() {
    dispatch(setMapLoad(false));
  }, []);

  useEffect(() => {
    if (mapKey) dispatch(setMapLoad(true));
  }, [mapKey]);

  useEffect(() => {
    setMapKey((prev) => (prev += 1));
    setMakers(places);
  }, [origin, destination]);

  return isLoaded ? (
    <GoogleMap
      key={mapKey}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        {makers.map((marker: any, index: number) => {
          const position = { lat: marker.lat, lng: marker.lng };
          return <MarkerF position={position} key={index} />;
        })}

        <PolylineDistance directions={places} />

        <DirectionRender
          places={places}
          travelMode={google.maps.TravelMode.DRIVING}
        />

        <CalcDirections />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
