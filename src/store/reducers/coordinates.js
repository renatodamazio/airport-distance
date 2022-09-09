import { createSlice } from "@reduxjs/toolkit";

export const coordinates = createSlice({
  name: "coordinates",
  initialState: {
    origin: {},
    destination: {},
  },

  reducers: {
    setOrigin(state, action) {
      state.origin = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
  },
});

export const { setOrigin, setDestination } = coordinates.actions;
export default coordinates.reducer;
