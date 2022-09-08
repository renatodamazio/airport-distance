import React, { useEffect } from "react";
import { calcNauticalMiles, calcKilometers } from "./utils/distance";
import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";

function App() {
  return (
    <div className="App">
      <Search />
      <Map />
      <DistanceService />
    </div>
  );
}

export default App;
