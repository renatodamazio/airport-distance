import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

function Steps() {
  const directions = useSelector((state: any) => state.distances.steps);
  return (
    directions && (
        <Stepper orientation="vertical">
            {directions.map((direction: any, index: number) => {
            return (
                <Step>
                <StepLabel>{direction.instructions}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
    )
  );
}

export default Steps;
