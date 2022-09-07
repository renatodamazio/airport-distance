import { useEffect, useState } from "react";

function DirectionService(props: any) {
  const { directions } = props;

  const [results, setResults] = useState<any>(null);
  const directionsCalculation = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(30.194528, -97.669889),
        destination: new google.maps.LatLng(35.877639, -78.787472),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setResults(result?.routes[0].legs[0]);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    if(window.google) directionsCalculation();
  }, [directions]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return <div>
    distance: {results?.distance?.text}
    <br/>
    duration: {results?.duration?.text}
    <br/>

  </div>;
}

export default DirectionService;
