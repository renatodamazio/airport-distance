import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import airports from "../../lib/airports.json";
import Box from "@mui/material/Box";

function AutocompleteField(props: any) {
  const { name, label, getLatLgnFromOptionList } = props;

  const emitChange = (airport: any[]) => {
    if (!airport) return false;
    getLatLgnFromOptionList(airport, name);
  };
  //   onInputChange={(e, airport) => emitChange(e, airport)}

  return (
    <Autocomplete
      disablePortal
      size="small"
      options={airports}
      onChange={(_, b: any[]) => emitChange(b)}
      getOptionLabel={(item) => item.name || item.iata_code}
      sx={{ width: 300 }}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.iata_code}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export default AutocompleteField;
