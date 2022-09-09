/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import DirectionRender from "./DirectionRender";
import PolylineDistance from "../polyline/Polyline";

import { useSelector, useDispatch, batch } from "react-redux";

import { calcKilometers, calcNauticalMiles } from "../../utils/distance";

import markerOrigin from "../../icons/origin-map-marker.png";
import markerDestination from "../../icons/destination-map-marker.png";

import { styles } from "./map.style";

import {
  setDistance,
  setNautical,
  setDuration,
  setSteps,
  setKilometers,
} from "../../store/reducers/distances";

const containerStyle = {
  width: "100wh",
  height: "100vh",
  display: "flex",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const [mapKey, setMapKey] = useState<number>(0);
  const [map, setMap] = useState<any>("");
  const [makers, setMakers] = useState<any>([]);

  const dispatch = useDispatch();

  const transport = useSelector((state: any) => state.distances.transport);

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

    let data: any = {
      distance: "",
      duration: "",
      steps: "",
    };

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

    const getDistances = useCallback(() => {
      let travelMode = google.maps.TravelMode.DRIVING;

      switch (transport) {
        case "DRIVING":
          travelMode = google.maps.TravelMode.DRIVING;
          break;
        case "BICYCLING":
          travelMode = google.maps.TravelMode.BICYCLING;
          break;
        case "WALKING":
          travelMode = google.maps.TravelMode.WALKING;
          break;
        case "TRANSIT":
          travelMode = google.maps.TravelMode.TRANSIT;
          break;
      }

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(origin.lat, origin.lng),
          destination: new google.maps.LatLng(destination.lat, destination.lng),
          travelMode: travelMode,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            data = result?.routes[0].legs[0];
          } else {
            data = {
              distance: false,
              duration: false,
              steps: false,
            };
          }
          batch(() => {
            dispatch(setDistance(data?.distance?.text));
            dispatch(setDuration(data?.duration?.text));
            dispatch(setSteps(data?.steps));
          });
        }
      );
    }, []);

    batch(() => {
      dispatch(setNautical(distance_in_nm));
      dispatch(setKilometers(distance_in_km));
    });

    useEffect(() => {
      getDistances();
    }, []);

    return <></>;
  };

  const checkEmptyDirections = (direction: object): any[] => {
    return Object.keys(direction);
  };

  const onLoad = useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds();
      let mkr: any = "";

      const origin = checkEmptyDirections(places[0]);
      const destination = checkEmptyDirections(places[1]);

      if (origin.length && destination.length) {
        for (var i = 0; i < places.length; i++) {
          mkr = new google.maps.Marker({
            position: new google.maps.LatLng(places[i], places[i]),
            map: map,
          });

          if (i == 0) {
            mkr.setIcon(markerOrigin);
          } else {
            mkr.setIcon(markerDestination);
          }
          bounds.extend(mkr.position);
        }
        map.fitBounds(bounds);
      }

      setMap(map);
    },
    [origin, destination]
  );

  const onUnmount = useCallback(function callback() {}, []);

  useEffect(() => {
    setMakers(places);
    setMapKey((prev) => (prev += 1));
  }, [origin, destination]);

  return isLoaded ? (
    <GoogleMap
      key={mapKey}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      options={{ styles }}
      onUnmount={onUnmount}
    >
      <>
        {/* {makers.map((marker: any, index: number) => {
          const position = { lat: marker.lat, lng: marker.lng };
          return (
            <MarkerF
              icon={{
                url: "https://img.icons8.com/fluency/344/where.png",
                scaledSize: new google.maps.Size(50, 50)
              }}
              position={position}
              key={index}
            />
          );
        })} */}

        <PolylineDistance directions={places} />

        <DirectionRender places={places} travelMode={transport} />

        <CalcDirections />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
