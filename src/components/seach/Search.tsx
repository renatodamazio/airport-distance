import { useEffect, useState } from "react";
import { useDispatch, batch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Colors } from "../../theme/colors";

import { setDestination, setOrigin } from "../../store/reducers/coordenates";
import AutocompleteField from "./Autocomplete";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { setEndAddress, setStartAddress, setSameCountry } from "../../store/reducers/distances";

import { HiLocationMarker } from "react-icons/hi";
import { MdTripOrigin} from "react-icons/md";

interface optionsReferecenPoints {
  airportList?: any;
  name?: string;
  iataCode?: string;
  country?:string;
}

interface destinationsReference {
  origin: object;
  destination: object;
  country?:string;
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
    country: ""
  });

  const [destinationOptions, setDestinationOptions] =
    useState<optionsReferecenPoints>({
      airportList: [],
      name: "",
      iataCode: "",
      country: ""
    });

  const getCoordenates = (data: any) => {
    const geo = data._geoloc;
    return { lat: geo.lat, lng: geo.lng };
  };

  const getLatLgnFromOptionList = (data: any, direction: string) => {
    const coordenates = getCoordenates(data);

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
        country: data.country,
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
        country: data.country,
        airportList: [],
      });
    }
  };

  const checkEmptyDirections = (direction: object): any[] => {
    return Object.keys(direction);
  };

  const showResults = () => {
    const { origin, destination } = directions;

    const isOriginValid = checkEmptyDirections(origin).length;
    const isDestinationValid = checkEmptyDirections(destination).length;

    if (!isOriginValid) return;
    if (!isDestinationValid) return;

    batch(() => {
      dispatch(setSameCountry(destinationOptions.country === originOptions.country));
      dispatch(setOrigin(origin));
      dispatch(setDestination(destination));
    });
  };

  useEffect(() => {
    showResults()
  }, [directions]);

  return (
    <Grid container spacing={1}>
      <ToastContainer />

      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemIcon><MdTripOrigin  color={Colors?.primary.main}/></ListItemIcon>

            <ListItemText>
              <AutocompleteField
                getLatLgnFromOptionList={getLatLgnFromOptionList}
                label="Origin"
                name="origin"
              />
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><HiLocationMarker  color={Colors?.secondary.main}/></ListItemIcon>
            <ListItemText>
              <AutocompleteField
                getLatLgnFromOptionList={getLatLgnFromOptionList}
                label="Destination"
                name="destination"
              />
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default Search;
