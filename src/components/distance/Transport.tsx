import React, { useState } from "react";

import { Button, ButtonGroup } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setTransport } from "../../store/reducers/distances";

interface transportReference {
  title: string;
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
      title: "Driving",
      icon: "driving",
      code: "DRIVING",
    },
    {
      title: "Bicycling",
      icon: "bike",
      code: "BICYCLING",
    },
    {
      title: "Transit",
      icon: "transit",
      code: "TRANSIT",
    },
    {
      title: "WALKING",
      icon: "walking",
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
          <Button
            variant={
              activeTransport === transport.code ? "contained" : "outlined"
            }
            onClick={() => defineTravelTransport(transport)}
            key={key}
          >
            {transport.title}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

export default Transport;
