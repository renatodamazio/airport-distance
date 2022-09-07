import React, { useState } from "react";
import airports from "../../lib/airports.json";
import { useDispatch } from "react-redux";

import { setOrigin } from "../../store/reducers/coordenates";
import ResultsList from "./ResultsList";

function Search() {
  const dispatch = useDispatch();

  const [options, setOptions] = useState<any>([]);

  const search = (text: string): object[] => {
    if (text.length < 3) return [];
    const query = text.toLowerCase();
    const results = [...airports].filter(
      (item: any) =>
        item.name.toLowerCase().includes(query) ||
        item.iata_code.toLowerCase().includes(query)
    );

    return results;
  };

  const searchAirPorts = (text: string) => {
    const resp: any = search(text);
    if (resp) {
      setOptions(resp.splice(0, 5));
    }
  };

  const getCoordenates = (data: any) => {
    const geo = data._geoloc;
    return { lat: geo.lat, lng: geo.lng };
  };

  const defineOriginLatLgn = (data: any) => {
    const coordenates = getCoordenates(data);
    dispatch(setOrigin(coordenates));
    setOptions([]);
  };

  return (
    <div>
      <input
        type="text"
        defaultValue={"Hartsfield Jackson Atlanta Intl"}
        onInput={(e: any) => searchAirPorts(e?.target?.value)}
      />
      <ResultsList onClick={defineOriginLatLgn} options={options} />
    </div>
  );
}

export default Search;
