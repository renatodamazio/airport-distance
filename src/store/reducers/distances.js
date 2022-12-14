import { createSlice } from "@reduxjs/toolkit";

export const distances = createSlice({
  name: "distances",
  initialState: {
    distance: "",
    duration: "",
    inverse: false,
    steps: [],
    nautical: 0,
    kilometers: 0,
    transport: "DRIVING",
    sameCountry: false,
    start_address:  {
     
    },
    end_address: {
      name: ""
    },
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

    setTransport(state, action) {
      state.transport = action.payload;
    },

    setSameCountry(state, action) {
      state.sameCountry = action.payload;
    },
    setInverse(state) {
      state.inverse = !state.inverse;
    }
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
  setTransport,
  setSameCountry,
  setInverse
} = distances.actions;

export default distances.reducer;
