/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import DirectionRender from "./DirectionRender";
import DistanceService from "../distance/DistanceService";
import PolylineDistance from "../polyline/Polyline";

import { useSelector } from "react-redux";

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

  const { origin, destination } = useSelector(
    (state: any) => state.coordenates
  );

  const places = [origin, destination];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCjkCjzb4MdOpgMh8DSBXg3hfhnzH6cGJo",
    libraries: ["geometry", "drawing"],
  });

  const onLoad = useCallback(
    function callback(map: any) {
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
    },
    [origin, destination]
  );

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

        <DistanceService />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
