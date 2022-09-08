import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useSelector } from "react-redux";

function Steps() {
  const directions = useSelector((state: any) => state.distances.steps);
  return (
    directions && (
      <Stepper orientation="vertical">
        {directions.map((direction: any, index: number) => {
          return (
            <Step active={true}>
              <StepLabel><p dangerouslySetInnerHTML={{__html: direction.instructions}}></p></StepLabel>
            </Step>
          );
        })}
      </Stepper>
    )
  );
}

export default Steps;
