import React from "react";
import {
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";

import {
  MdDirectionsCar,
  MdOutlineDirectionsBike,
  MdDirectionsBus,
  MdDirectionsWalk,
} from "react-icons/md";

function Steps() {
  const directions = useSelector((state: any) => state.distances.steps);

  const iconContructor = () => {
    const icon = directions[0].travel_mode;

    let displayIcon:any = <MdDirectionsCar color="blue"/>;

    switch(icon) {
      case "DRIVING":
        displayIcon = <MdDirectionsCar color="blue"/>
        break;
      case "BICYCLING":
        displayIcon = <MdOutlineDirectionsBike/>
        break;
      case "TRANSIT":
        displayIcon = <MdDirectionsBus/>
        break;
      case "WALKING":
        displayIcon = <MdDirectionsWalk/>
        break;
    }

    return displayIcon;
  }

  return (
    directions && (
      <Stepper orientation="vertical" >
        {directions.map((direction: any, index: number) => {
          return (
            <Step active={true}>
              <StepLabel StepIconComponent={iconContructor}>
                <p
                  dangerouslySetInnerHTML={{ __html: direction.instructions }}
                ></p>
              </StepLabel>
              <StepContent>
                <Typography variant="caption">
                  {direction.duration.text} - {direction.distance.text}
                </Typography>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    )
  );
}

export default Steps;
