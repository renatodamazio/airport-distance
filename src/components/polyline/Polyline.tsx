import React, { useEffect, useState } from "react";
import { Polyline } from "@react-google-maps/api";
import { MAP_SETTINGS } from "./configurations";

function PolylineDistance(props: any) {
  const { directions } = props;

  const [path, setPath] = useState<any>([]);

  useEffect(() => {
    const arr: any = [];
    directions.forEach((dir: any) => {
      arr.push({
        lat: dir.latitude,
        lng: dir.longitude,
      });
    });

    setPath(arr);
  }, [directions]);

  return path.length && <Polyline path={path} />;
}

export default PolylineDistance;
