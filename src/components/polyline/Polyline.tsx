import React, { useEffect, useState } from "react";
import { Polyline, DirectionsRenderer } from "@react-google-maps/api";
import { MAP_SETTINGS } from "./configurations";

function PolylineDistance(props: any) {
  const { directions } = props;

  const [path, setPath] = useState<any>([]);

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  };

  useEffect(() => {
    const arr: any = [];
    directions.forEach((dir: any) => {
      arr.push({
        lat: dir.lat,
        lng: dir.lng,
      });
    });

    setPath(arr);
  }, [directions]);

  return (
    path.length && (
      <>
        <Polyline path={path} options={options}/>
        <DirectionsRenderer directions={path} />
      </>
    )
  );
}

export default PolylineDistance;
