import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";
import { Divider, Card, CardContent, Typography } from "@mui/material";
import Transport from "./components/distance/Transport";
import Steps from "./components/steps/Steps";
import { Colors } from "./theme/colors";
import { useSelector } from "react-redux";

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
  padding: 12,
  flexDirection: "column",
};

const main = {
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  background: Colors.default.dark,
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
};

function App() {
  const sameCountry = useSelector((state: any) => state.distances.sameCountry);
  return (
    <div style={main}>
      <div style={aside}>
        <div style={{ width: "100%" }}>
          <Card style={{ marginBottom: 8, overflow: "inherit" }}>
            <CardContent>
              {sameCountry && <Transport />}
              <Search />
            </CardContent>
          </Card>
          <Card style={{ marginBottom: 8 }}>
            <CardContent>
              <Divider>
                <Typography variant="h6">Distance</Typography>
              </Divider>
              <DistanceService />
            </CardContent>
          </Card>
        </div>
        {sameCountry && (
          <Card style={{ overflow: "auto" }}>
            <CardContent>
              <Steps />
            </CardContent>
          </Card>
        )}
      </div>

      <div style={section}>
        <Map />
      </div>
    </div>
  );
}

export default App;
