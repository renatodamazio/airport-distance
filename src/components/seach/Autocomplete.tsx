import React, { useState, forwardRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import airports from "../../lib/airports.json";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

interface airportReference {
  name: string;
  city: string;
  country: string;
  iata_code: string;
  _geoloc: any | object;
  links_count: string | number;
  objectID: string;
}

const AutocompleteField = forwardRef((props: any, ref: any) => {
  const [airportsAvailable, setAirportsAvailable] = useState<airportReference[]>([]);

  const { name, label, getLatLgnFromOptionList, defaultValue } =
    props;


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
        item.iata_code.toLowerCase().includes(query)
    );

    setAirportsAvailable(results);
    return results;
  };

  const filterOptions = createFilterOptions({
    limit: 5,
  });

  useEffect(() => {
    if (!airportsAvailable.length && defaultValue) {
      airportsAvailable[0] = defaultValue;
    }
  }, [defaultValue])

  return (
    <Autocomplete
      disablePortal
      size="medium"
      filterOptions={filterOptions}
      defaultValue={airportsAvailable.length ? airportsAvailable[0] : ""}
      options={airportsAvailable}
      onInput={(event: any) => filterAirports(event.target.value)}
      onChange={(_, b: any[]) => emitChange(b)}
      getOptionLabel={(item) => item.name || item.iata_code}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.iata_code}>
          {option.iata_code} - {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} defaultValue="" label={label} />
      )}
      ref={ref}
    />
  );
});

export default AutocompleteField;
