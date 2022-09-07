import React, { useEffect } from "react";
import { calcNauticalMiles, calcKilometers } from "./utils/distance";
import Map from "./components/map";

function App() {
  const a = -6.081689834590001;
  const b = 145.391998291;

  const c = 61.53630065917969;
  const d = -160.34100341796875;

  useEffect(() => {
    const nautical = calcNauticalMiles(a, b, c, d);
    const kilometer = calcKilometers(a, b, c, d);

    console.log(nautical, "\n", kilometer);
  }, []);
  return <div className="App">
    <Map/>
    </div>;
}

export default App;
