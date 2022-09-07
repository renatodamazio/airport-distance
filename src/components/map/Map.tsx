import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import DirectionRender from "./DirectionRender";
import DistanceService from "../distance/DistanceService";
import PolylineDistance from "../polyline/Polyline";

import { useSelector } from "react-redux";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const [mapKey, setMapKey] = useState<number>(0);
  const { origin, destination } = useSelector(
    (state: any) => state.coordenates
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCjkCjzb4MdOpgMh8DSBXg3hfhnzH6cGJo",
    libraries: ["geometry", "drawing"],
  });

  const places = [origin, destination];

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  const onUnmount = useCallback(function callback(_map: any) {}, []);

  useEffect(() => {
    setMapKey((prev) => (prev += 1));
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
        {places.map((marker: any, index: number) => {
          const position = { lat: marker.lat, lng: marker.lng };
          return (
            position.lat &&
            position.lng && <Marker position={position} key={index} />
          );
        })}

        <PolylineDistance directions={places} />

        <DirectionRender
          places={places}
          travelMode={google.maps.TravelMode.DRIVING}
        />

        <DistanceService />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
