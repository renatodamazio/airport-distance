import { createSlice } from "@reduxjs/toolkit";

export const distances = createSlice({
  name: "distances",
  initialState: {
    distance: "",
    duration: "",
    steps: {},
    nautical: 0,
    kilometers: 0,
    start_address: "",
    end_address: "",
  },

  reducers: {
    setDistance(state, action) {
      state.distance = action.payload;
    },

    setKilometers(state, action) {
      state.kilometers = action.payload;
    },

    setDuration(state, action) {
      state.duration = action.payload;
    },

    setSteps(state, action) {
      state.steps = action.payload;
    },

    setNautical(state, action) {
      state.nautical = action.payload;
    },

    setStartAddress(state, action) {
      state.start_address = action.payload;
    },

    setEndAddress(state, action) {
      state.end_address = action.payload;
    },
  },
});

export const {
  setDistance,
  setKilometers,
  setDuration,
  setSteps,
  setNautical,
  setStartAddress,
  setEndAddress,
} = distances.actions;

export default distances.reducer;
