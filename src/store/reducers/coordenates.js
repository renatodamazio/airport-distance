import { createSlice } from "@reduxjs/toolkit";

export const coordenates = createSlice({
  name: "coordenates",
  initialState: {
    origin: { lat: 33.636719, lng: -84.428067 },
    destination: { lat: 51.4775, lng: -0.461389 },
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
