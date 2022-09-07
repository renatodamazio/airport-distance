import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import DirectionRender from "./DirectionRender";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCjkCjzb4MdOpgMh8DSBXg3hfhnzH6cGJo",
    libraries: ["geometry", "drawing"],
  });

  const [map, setMap] = useState(null);
  const places = [
    { latitude: 25.8103146, longitude: -80.1751609 },
    { latitude: 27.9947147, longitude: -82.5943645 },
    { latitude: 28.4813018, longitude: -81.4387899 },
  ];

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(_map: any) {
    setMap(null);
  }, []);

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
