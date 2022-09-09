import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";
import { Divider, Card, CardContent, Typography } from "@mui/material";
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
  padding: 6,
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
  padding: 30,
};

function App() {
  return (
    <div style={main}>
      <div style={aside}>
        <div style={{ width: "100%" }}>
          <Card style={{ marginBottom: 8, overflow: "inherit" }}>
            <CardContent>
              <Transport />
              <Search />
            </CardContent>
          </Card>
          <Card style={{ borderRadius: 0, marginBottom: 6 }}>
            <CardContent>
              <Divider>
                <Typography variant="h6">Distance</Typography>
              </Divider>
              <DistanceService />
            </CardContent>
          </Card>
        </div>
        <div style={paths}>
          <Steps />
        </div>
      </div>

      <div style={section}>
        <Map />
      </div>
    </div>
  );
}

export default App;
