import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";
import { Box, Grid, Divider, Card, CardContent } from "@mui/material";
import Transport from "./components/distance/Transport";

function App() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <Card style={{ borderRadius: 0 }}>
            
            <CardContent>
            <Transport />
            </CardContent>

            <CardContent>
              <Search />
            </CardContent>
            
            <Divider/>

            <CardContent>
              <DistanceService />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Map />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
