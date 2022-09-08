import React, { useState } from "react";
import airports from "../../lib/airports.json";
import { useDispatch, batch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setDestination, setOrigin } from "../../store/reducers/coordenates";

import ResultsList from "./ResultsList";
import Input from "./Input";

interface optionsReferecenPoints {
  airportList?: any;
  name?: string;
  iataCode?: string;
}

interface destinationsReference {
  origin: object;
  destination: object;
}

function Search() {
  const dispatch = useDispatch();

  const [directions, setDirections] = useState<destinationsReference>({
    origin: {},
    destination: {},
  });

  const [originOptions, setOriginOptions] = useState<optionsReferecenPoints>({
    airportList: [],
    name: "",
    iataCode: "",
  });

  const [destinationOptions, setDestinationOptions] =
    useState<optionsReferecenPoints>({
      airportList: [],
      name: "",
      iataCode: "",
    });

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

  const searchAirPorts = (text: string): object => {
    const resp: any = search(text);
    if (resp) {
      return resp.splice(0, 5);
    } else {
      return [];
    }
  };

  const getCoordenates = (data: any) => {
    const geo = data._geoloc;
    return { lat: geo.lat, lng: geo.lng };
  };

  const getAirportSearchList = (query: HTMLInputElement) => {
    const { value, name } = query;

    const listAirports: object = searchAirPorts(value);

    if (name === "destination") {
      setDestinationOptions({
        ...originOptions,
        airportList: listAirports,
      });
    } else {
      setOriginOptions({
        ...originOptions,
        airportList: listAirports,
      });
    }
  };

  const getLatLgnFromOptionList = (data: any, direction: string) => {
    const coordenates = getCoordenates(data);

    if (direction === "destination") {
      setDirections({
        ...directions,
        destination: coordenates,
      });

      setDestinationOptions({
        ...destinationOptions,
        name: data.name,
        iataCode: data.iata_code,
        airportList: []
      });
    } else {
      setDirections({
        ...directions,
        origin: coordenates,
      });

      setOriginOptions({
        name: data.name,
        iataCode: data.iata_code,
        airportList: []
      });
    }
  };

  const checkEmptyDirections = (direction: object): any[] => {
    return Object.keys(direction);
  };

  /**
   * Active when click at button.
   */
  const showResults = () => {
    const { origin, destination } = directions;

    const isOriginValid = checkEmptyDirections(origin).length;
    const isDestinationValid = checkEmptyDirections(destination).length;

    if (!isOriginValid) return toast("Origin not provided.");
    if (!isDestinationValid) return toast("Destination not provided.");

    batch(() => {
      dispatch(setOrigin(origin));
      dispatch(setDestination(destination));
    });
  };

  return (
    <>
      <ToastContainer />

      <div>
        <Input
          value={originOptions.name}
          name="origin"
          onInput={(e: any) => getAirportSearchList(e?.target)}
        />
        <ResultsList
          direction="origin"
          onClick={getLatLgnFromOptionList}
          options={originOptions.airportList}
        />
      </div>

      <div>
        <Input
          value={destinationOptions.name}
          name="destination"
          onInput={(e: any) => getAirportSearchList(e?.target)}
        />
        <ResultsList
          direction="destination"
          onClick={getLatLgnFromOptionList}
          options={destinationOptions.airportList}
        />
      </div>

      <div>
        <button onClick={showResults}>SHow results</button>
      </div>
    </>
  );
}

export default Search;
