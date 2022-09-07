import { useEffect, useState } from "react";
import { calcNauticalMiles } from "../../utils/distance";

function DirectionService(props: any) {
  const { directions } = props;

  const [results, setResults] = useState<any>(null);
  const [nauticalMiles, setNauticalMiles] = useState<number>(0);

  const directionsCalculation = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    const getNauticalMiles = calcNauticalMiles(
      30.194528,
      -97.669889,
      35.877639,
      -78.787472
    );

    setNauticalMiles(getNauticalMiles);

    // const getNauticalMiles = calcNauticalMiles(
    //     origin.lat,
    //     origin.lng,
    //     destination.lat,
    //     destination.lng
    //   );

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
    directionsCalculation();
  }, [directions]);

  useEffect(() => {
    // console.log(results);
  }, [results]);

  return (
    <div>
      Nautical Distance: {nauticalMiles?.toFixed(3)}
      <br />
      distance: {results?.distance?.text}
      <br />
      duration: {results?.duration?.text}
      <br />
    </div>
  );
}

export default DirectionService;
