import { useState } from "react";
import Map from "./components/map";
import Search from "./components/seach/Search";
import DistanceService from "./components/distance/DistanceService";
import {
  Divider,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import Transport from "./components/distance/Transport";
import Steps from "./components/steps/Steps";
import { useSelector } from "react-redux";
import SearchModal from "./components/searchModal/SearchModal";
import "./App.css";

import { MdOutlineClose } from "react-icons/md";

function App() {
  const [toogleApp, setToggleApp] = useState<boolean>(false);

  const sameCountry = useSelector((state: any) => state.distances.sameCountry);
  
  return (
    <div className={`app-main`}>
      <SearchModal />
      <div className={`app-side-bar  ${toogleApp ? "hidden-side-bar" : ""}`}>
        <div style={{ width: "100%" }}>
          <div className="app-close-main-mobile">
            <IconButton onClick={() => setToggleApp(!toogleApp)}>
              <MdOutlineClose />
            </IconButton>
          </div>

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
          <Card style={{ overflow: "auto" }} className="app-steps">
            <CardContent>
              <Steps />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="app-map-container">
        <Map />
      </div>

      <div className={`app-show-side-bar ${!toogleApp ? "hidden" : ""}`}>
        <Chip
          label="Open informations"
          size="medium"
          color="secondary"
          onClick={() => setToggleApp(!toogleApp)}
        />
      </div>
    </div>
  );
}

export default App;
