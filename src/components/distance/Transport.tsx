import React, { useState } from "react";

import { IconButton, ButtonGroup, Tooltip } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setTransport } from "../../store/reducers/distances";
import { Colors } from "../../theme/colors";

import {
  MdDirectionsCar,
  MdOutlineDirectionsBike,
  MdDirectionsBus,
  MdDirectionsWalk,
} from "react-icons/md";

interface transportReference {
  icon: string | any;
  code: string;
  bgColor: any;
}

function Transport() {
  const dispatch = useDispatch();
  const { transport: activeTransport } = useSelector(
    (state: any) => state.distances
  );

  const [transports, setTransports] = useState<transportReference[]>([
    {
      icon: <MdDirectionsCar />,
      bgColor: Colors?.primary?.light,
      code: "DRIVING",
    },
    {
      icon: <MdOutlineDirectionsBike />,
      code: "BICYCLING",
      bgColor: Colors?.success?.light,
    },
    {
      icon: <MdDirectionsBus />,
      code: "TRANSIT",
      bgColor: Colors?.error?.light,
    },
    {
      icon: <MdDirectionsWalk />,
      code: "WALKING",
      bgColor: Colors?.warning?.light,
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
                  activeTransport === transport.code ? `${transport.bgColor}` : "",
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
