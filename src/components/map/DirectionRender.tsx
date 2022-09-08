import React, { useEffect, useState } from "react";

import { DirectionsRenderer } from "@react-google-maps/api";

function DirectionRender(props: any) {
  const { places, travelMode } = props;

  const [state, setState] = useState<any>({
    directions: {},
    error: {},
  });

  const initDirections = () => {
    const waypoints = places.map((p: any) => ({
      location: { lat: p.lat, lng: p.lng },
      stopover: true,
    }));

    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setState({
            directions: result,
          });
        } else {
          setState({ error: result });
        }
      }
    );
  };

  useEffect(() => {
    initDirections();
  }, [travelMode]);

  return (
    <>
      <DirectionsRenderer directions={state.directions} />
    </>
  );
}

export default DirectionRender;
