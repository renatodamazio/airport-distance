import { createSlice } from "@reduxjs/toolkit";

export const coordenates = createSlice({
  name: "coordenates",
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

export const { setOrigin, setDestination } = coordenates.actions;
export default coordenates.reducer;
