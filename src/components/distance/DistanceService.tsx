import { useSelector } from "react-redux";

function DirectionService(props: any) {
  const { nautical, distance, duration, kilometers } = useSelector(
    (state: any) => state.distances
  );
  return (
    <div>
      Kilometers: {kilometers}
      <br />
      Nautical miles: {nautical?.toFixed(3)}
      <br />
      Miles: {distance}
      <br />
      Duration: Driving {duration}
      <br />
    </div>
  );
}

export default DirectionService;
