import React, { useState } from "react";

import { IconButton, ButtonGroup, Tooltip } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setTransport } from "../../store/reducers/distances";
import blue from "@material-ui/core/colors/blue";

import {
  MdDirectionsCar,
  MdOutlineDirectionsBike,
  MdDirectionsBus,
  MdDirectionsWalk,
} from "react-icons/md";

interface transportReference {
  icon: string | any;
  code: string;
}

function Transport() {
  const dispatch = useDispatch();
  const { transport: activeTransport } = useSelector(
    (state: any) => state.distances
  );

  const [transports, setTransports] = useState<transportReference[]>([
    {
      icon: <MdDirectionsCar />,
      code: "DRIVING",
    },
    {
      icon: <MdOutlineDirectionsBike />,
      code: "BICYCLING",
    },
    {
      icon: <MdDirectionsBus />,
      code: "TRANSIT",
    },
    {
      icon: <MdDirectionsWalk />,
      code: "WALKING",
    },
  ]);

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const defineTravelTransport = (ev: transportReference) => {
    dispatch(setTransport(ev.code));
  };

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group"
      style={styles}
    >
      {transports.map((transport: any, key: number) => {
        return (
          <Tooltip title={transport.code}>
            <IconButton
              style={{
                background:
                  activeTransport === transport.code ? `${blue[100]}` : "",
              }}
              onClick={() => defineTravelTransport(transport)}
              key={key}
            >
              {transport.icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
}

export default Transport;
