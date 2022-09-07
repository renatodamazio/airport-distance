import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import DirectionRender from "./DirectionRender";
import PolylineDistance from "../polyline/Polyline";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const [map, setMap] = useState(null);
  const [results, setResults] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCjkCjzb4MdOpgMh8DSBXg3hfhnzH6cGJo",
    libraries: ["geometry", "drawing"],
  });

  const places = [
    { latitude: 30.194528, longitude: -97.669889 },
    { latitude: 35.877639, longitude: -78.787472 },
  ];

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    directionsCalculation();
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(_map: any) {
    setMap(null);
  }, []);

  const directionsCalculation = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route({
      origin: new google.maps.LatLng(30.194528,  -97.669889),
      destination: new google.maps.LatLng(35.877639, -78.787472),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setResults(result?.routes[0].legs[0]);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  useEffect(() => {
    console.log(results);
  }, [results])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        {places.map((marker: any, index: number) => {
          const position = { lat: marker.latitude, lng: marker.longitude };
          return <Marker position={position} key={index} />;
        })}

        <PolylineDistance directions={places} />

        <DirectionRender
          places={places}
          travelMode={google.maps.TravelMode.DRIVING}
        />

        <Marker position={{ lat: 36.8236, lng: 7.8103 }} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
