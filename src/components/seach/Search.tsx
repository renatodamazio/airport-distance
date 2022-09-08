import { useState } from "react";
import { useDispatch, batch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setDestination, setOrigin } from "../../store/reducers/coordenates";
import AutocompleteField from "./Autocomplete";
import { Button, Grid } from "@mui/material";
import { setEndAddress, setStartAddress } from "../../store/reducers/distances";

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

  const getCoordenates = (data: any) => {
    const geo = data._geoloc;
    return { lat: geo.lat, lng: geo.lng };
  };

  const getLatLgnFromOptionList = (data: any, direction: string) => {
    const coordenates = getCoordenates(data);
    console.log(data);

    if (direction === "destination") {
      dispatch(setEndAddress(data));

      setDirections({
        ...directions,
        destination: coordenates,
      });

      setDestinationOptions({
        ...destinationOptions,
        name: data.name,
        iataCode: data.iata_code,
        airportList: [],
      });
    } else {
      dispatch(setStartAddress(data));

      setDirections({
        ...directions,
        origin: coordenates,
      });

      setOriginOptions({
        name: data.name,
        iataCode: data.iata_code,
        airportList: [],
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
    <Grid container spacing={2}>
      <ToastContainer />

      <Grid item xs={12}>
        <AutocompleteField
          getLatLgnFromOptionList={getLatLgnFromOptionList}
          label="Origin"
          name="origin"
        />
      </Grid>

      <Grid item xs={12}>
        <AutocompleteField
          getLatLgnFromOptionList={getLatLgnFromOptionList}
          label="Destination"
          name="destination"
        />
      </Grid>

      <Grid item xs={12}>
        <Button size="large" variant="contained" onClick={showResults}>
          SHow results
        </Button>
      </Grid>
    </Grid>
  );
}

export default Search;
