import { useEffect, useState } from "react";
import { useDispatch, batch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setDestination, setOrigin } from "../../store/reducers/coordenates";
import AutocompleteField from "./Autocomplete";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { setEndAddress, setStartAddress } from "../../store/reducers/distances";

import { HiLocationMarker } from "react-icons/hi";
import { MdTripOrigin} from "react-icons/md";

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

  const [_, setOriginOptions] = useState<optionsReferecenPoints>({
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

    if (!isOriginValid) return;
    if (!isDestinationValid) return;

    batch(() => {
      dispatch(setOrigin(origin));
      dispatch(setDestination(destination));
    });
  };

  useEffect(() => {
    showResults()
  }, [directions])

  return (
    <Grid container spacing={1}>
      <ToastContainer />

      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemIcon><MdTripOrigin/></ListItemIcon>

            <ListItemText>
              <AutocompleteField
                getLatLgnFromOptionList={getLatLgnFromOptionList}
                label="Origin"
                name="origin"
              />
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><HiLocationMarker /></ListItemIcon>
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
