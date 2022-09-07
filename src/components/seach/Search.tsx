import React, { useState, useRef } from "react";
import airports from "../../lib/airports.json";
import { useDispatch } from "react-redux";

import { setOrigin } from "../../store/reducers/coordenates";
import ResultsList from "./ResultsList";

function Search() {
  const dispatch = useDispatch();

  const originField = useRef<null | HTMLInputElement>(null);
  const destinationField = useRef<null | HTMLInputElement>(null);

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

    const field = originField?.current;
    if (field) {
      field.value = data.name;
    }
    setOptions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Airport origin"
        ref={originField}
        onInput={(e: any) => searchAirPorts(e?.target?.value)}
      />
      
      <button>Search</button>
      <ResultsList onClick={defineOriginLatLgn} options={options} />
    </div>
  );
}

export default Search;
