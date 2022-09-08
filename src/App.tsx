import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";
import {
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Transport from "./components/distance/Transport";
import Steps from "./components/steps/Steps";

type FlexDirection =
  | "column"
  | "inherit"
  | "-moz-initial"
  | "initial"
  | "revert"
  | "unset"
  | "column-reverse"
  | "row"
  | "row-reverse"
  | any;

const aside: FlexDirection = {
  display: "flex",
  height: "100%",
  width: "40%",
  maxWidth: "400px",
  flexDirection: "column",
};

const main = {
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
};

const section = {
  width: "100%",
  height: "100%",
  background: "green",
};

const paths = {
  width: "100%",
  height: "100%",
  overflow: "auto",
  padding: 10,
};

function App() {
  return (
    <div style={main}>
      <div style={aside}>
        <div style={{ width: "100%" }}>
          <Card>
            <CardContent>
              <div>
                <Transport />
              </div>
              <div>
                <Search />
              </div>
            </CardContent>
          </Card>
          <div>
            <Card style={{borderRadius: 0}}>
              <CardContent>
                <Divider>
                  <Typography variant="h6">Distance</Typography>
                </Divider>
                <DistanceService />
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={paths}>
          <Divider>
            <Typography variant="h6">Directions</Typography>
          </Divider>
          <Steps />
        </div>
      </div>

      <div style={section}>
        <Map />
      </div>
    </div>
    // <Box style={{ maxHeight: "100vh", overflow: "hidden" }}>
    //   <Grid container>
    //     <Grid item xs={3} style={{ maxHeight: "100vh" }}>
    //       <Card style={{ borderRadius: 0, height: "100%" }}>
    //         <CardContent>
    //           <Transport />
    //         </CardContent>

    //         <CardContent>
    //           <Search />
    //         </CardContent>

    //         <Divider />

    //         <CardContent>
    //           <DistanceService />
    //         </CardContent>

    //         <Divider />

    //         <CardContent>
    //           <div style={{ display: "flex", height: "100%", border: "2px solid blue" }}>
    //             {/* <Steps /> */}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={9}>
    //       <Map />
    //     </Grid>
    //   </Grid>
    // </Box>
  );
}

export default App;
