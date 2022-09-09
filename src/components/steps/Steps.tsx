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

import { Colors } from "../../theme/colors";

function Steps() {
  const directions = useSelector((state: any) => state.distances.steps);

  const iconContructor = () => {
    const icon = directions[0].travel_mode;

    let displayIcon: any = <MdDirectionsCar color={Colors.primary.main} />;
    let textColor: string = "";

    switch (icon) {
      case "DRIVING":
        textColor = Colors.primary.main;
        displayIcon = <MdDirectionsCar color={textColor} />;
        break;
      case "BICYCLING":
        textColor = Colors.success.main;
        displayIcon = <MdOutlineDirectionsBike color={textColor} />;
        break;
      case "TRANSIT":
        textColor = Colors.error.main;
        displayIcon = <MdDirectionsBus color={textColor} />;
        break;
      case "WALKING":
        textColor = Colors.warning.main;
        displayIcon = <MdDirectionsWalk color={textColor} />;
        break;
    }

    return displayIcon;
  };

  return (
    directions && (
      <Stepper orientation="vertical">
        {directions.map((direction: any, index: number) => {
          return (
            <Step active={true} key={index}>
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
