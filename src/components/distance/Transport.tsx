import React, { useState } from "react";

import { Button, ButtonGroup } from "@mui/material";


interface transportReference {
  title: string;
  icon: string | any;
  code: string;
}

function Transport() {
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

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group"
      style={styles}
    >
      {transports.map((transport: any, key: number) => {
        return <Button key={key}>{transport.title}</Button>;
      })}
    </ButtonGroup>
  );
}

export default Transport;
