import { useEffect, useState, useRef } from "react";
import { useDispatch, batch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Colors } from "../../theme/colors";

import { setDestination, setOrigin } from "../../store/reducers/coordenates";
import AutocompleteField from "./Autocomplete";
import {
  Grid,
  List,
  Tooltip,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  setEndAddress,
  setStartAddress,
  setSameCountry,
  setInverse,
} from "../../store/reducers/distances";

import { HiLocationMarker } from "react-icons/hi";
import { MdTripOrigin } from "react-icons/md";
import { TbSwitchVertical } from "react-icons/tb";

interface optionsReferecenPoints {
  airportList?: any;
  name?: string;
  iataCode?: string;
  country?: string;
}

interface destinationsReference {
  origin: object;
  destination: object;
  country?: string;
}

interface searchFieldsReference {
  label: string;
  name: string;
}

function Search() {
  const dispatch = useDispatch();

  const inverse = useSelector((state: any) => state.distances.inverse);

  const [searchFields, setSearchFields] = useState<searchFieldsReference[]>([
    {
      label: "Airport Origin",
      name: "origin",
    },
    {
      label: "Airport Destination",
      name: "destination",
    },
  ]);

  const [directions, setDirections] = useState<destinationsReference>({
    origin: {},
    destination: {},
  });

  const [originOptions, setOriginOptions] = useState<optionsReferecenPoints>({
    airportList: [],
    name: "",
    iataCode: "",
    country: "",
  });

  const [destinationOptions, setDestinationOptions] =
    useState<optionsReferecenPoints>({
      airportList: [],
      name: "",
      iataCode: "",
      country: "",
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
      dispatch(
        setSameCountry(destinationOptions.country === originOptions.country)
      );
      dispatch(setOrigin(origin));
      dispatch(setDestination(destination));
    });
  };

  useEffect(() => {
    showResults();
  }, [directions]);

  useEffect(() => {
    var arr = [...searchFields];
    arr.reverse();

    if (inverse) {
      let reverseArr = arr.reverse();

      reverseArr[0].label = "Airport Destination";
      reverseArr[1].label = "Airport Origin";
    }
    setSearchFields(arr);

    showResults();
  }, [inverse]);

  return (
    <Grid container spacing={1}>
      <ToastContainer />
      <Grid item xs={11}>
        <List className={inverse ? "reverse-column" : ""}>
          {searchFields.map((item: any, index: number) => {
            return (
              <ListItem key={index}>
                <ListItemIcon>
                  {index === 0 ? (
                    <MdTripOrigin color={Colors?.primary.main} />
                  ) : (
                    <HiLocationMarker color={Colors?.secondary.main} />
                  )}
                </ListItemIcon>

                <ListItemText>
                  <AutocompleteField
                    getLatLgnFromOptionList={getLatLgnFromOptionList}
                    label={item.label}
                    name={item.name}
                  />
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Grid>

      <Grid item xs={1} style={{ display: "flex", alignItems: "center", paddingLeft: 0 }}>
        <Tooltip
          title={"invert origin point and destination"}
          placement="bottom-start"
        >
          <IconButton
            size="small"
            onClick={() => {
              dispatch(setInverse());
            }}
          >
            <TbSwitchVertical
              size="20px"
              color={inverse ? Colors.primary.main : Colors.shadow.main}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Search;
