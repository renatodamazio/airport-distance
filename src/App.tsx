import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";
import { Divider, Card, CardContent, Typography } from "@mui/material";
import Transport from "./components/distance/Transport";
import Steps from "./components/steps/Steps";
import { useSelector } from "react-redux";
import SearchModal from "./components/searchModal/SearchModal"
import "./App.css";

function App() {
  const sameCountry = useSelector((state: any) => state.distances.sameCountry);
  return (
    <div className="app-main">
      <SearchModal />
      <div className="app-side-bar">
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

      <div className="app-map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;
