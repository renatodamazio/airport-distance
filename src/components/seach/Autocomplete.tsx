import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import airports from "../../lib/airports.json";
import Box from "@mui/material/Box";

function AutocompleteField(props: any) {
  const [airportsAvailable, setAirportsAvailable] = useState<any>([]);

  const { name, label, getLatLgnFromOptionList } = props;

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

  return (
    <Autocomplete
      disablePortal
      size="small"
      filterOptions={filterOptions}
      options={airportsAvailable}
      onInput={(event: any) => filterAirports(event.target.value)}
      onChange={(_, b: any[]) => emitChange(b)}
      getOptionLabel={(item) => item.name || item.iata_code}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.iata_code}>
          {option.iata_code} - {option.name}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export default AutocompleteField;
