import { createSlice } from "@reduxjs/toolkit";

export const coordenates = createSlice({
  name: "coordenates",
  initialState: {
    origin: { lat: 30.194528, lng: -97.669889 },
    destination: { lat: 35.877639, lng: -78.787472 },
  },

  reducers: {
    setOrigin(state, action) {
      state.origin = { ...action.payload };
    },
    setDesination(state, action) {
      state.destination = { ...action.payload };
    },
  },
});

export const { setOrigin, setDesination } = coordenates.actions;
export default coordenates.reducer;
