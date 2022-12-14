import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import airports from "../../lib/airports.json";
import Box from "@mui/material/Box";

interface airportReference {
  name: string;
  city?: string;
  country?: string;
  iata_code?: string;
  _geoloc?: any | object;
  links_count?: string | number;
  objectID?: string;
}

interface filterOptionsReference {
  name: string;
  city: string;
  iata_code: string
}

const AutocompleteField = (props: any) => {
  const [airportsAvailable, setAirportsAvailable] = useState<
    airportReference[]
  >([]);

  const { name, label, getLatLgnFromOptionList, defaultValue, inputProps } =
    props;

  const ref = useRef<any>(null);

  const emitChange = (airport: any[]) => {
    if (!airport) return false;
    getLatLgnFromOptionList(airport, name);
  };

  const filterAirports = (text: string): object[] => {
    if (text.length < 3) return [];
    const query = text.toLowerCase();
    const results = [...airports].filter(
      (item: any) =>
        item.name.toLowerCase().includes(query) ||
        item.iata_code.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query)
    );


    setAirportsAvailable(results);
    return results;
  };

  const filterOptions = createFilterOptions<any>({
    limit: 5,
    stringify: (option: filterOptionsReference) => `${option.name} ${option.iata_code} ${option.city}`,
  });

  return (
    <>
      <Autocomplete
        disablePortal
        size="medium"
        filterOptions={filterOptions}
        defaultValue={{ name: defaultValue.name }}
        options={airportsAvailable}
        onInput={(event: any) => filterAirports(event.target.value)}
        onChange={(_, b: any[]) => emitChange(b)}
        getOptionLabel={(item) => item.name || item.iata_code || item.city || ""}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.iata_code}>
            {option.iata_code} - {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{ ...params.inputProps, tabIndex: inputProps.tabIndex }}
            autoFocus
            label={label}
          />
        )}
        ref={ref}
      />

    </>
  );
};

export default AutocompleteField;
