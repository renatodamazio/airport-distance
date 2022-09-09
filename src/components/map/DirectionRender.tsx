import React, { useEffect, useState } from "react";

import { DirectionsRenderer } from "@react-google-maps/api";
import { Colors } from "../../theme/colors";

function DirectionRender(props: any) {
  const { places, travelMode } = props;

  const [state, setState] = useState<any>({
    directions: {},
    error: false,
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
            error: false,
          });
        } else {
          setState({ error: true });
        }
      }
    );
  };

  const style = {
    strokeColor: Colors.secondary.light,
    strokeOpacity: 1.0,
    strokeWeight: 10
  }

  useEffect(() => {
    initDirections();
  }, [travelMode]);

  return !state.error ? (
    <DirectionsRenderer options={{ suppressMarkers: true, polylineOptions: style }}  directions={state.directions} />
  ) : (
    <></>
  );
}

export default DirectionRender;
