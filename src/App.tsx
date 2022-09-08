import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";
import { Box, Grid } from "@mui/material";

function App() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <Search />
          <DistanceService />
        </Grid>
        <Grid item xs={9}>
          <Map />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
