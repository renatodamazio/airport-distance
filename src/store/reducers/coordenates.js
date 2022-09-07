import { createSlice } from "@reduxjs/toolkit";

export const coordenates = createSlice({
  name: "coordenates",
  initialState: {
    origin: {},
    destination: {},
  },

  reducers: {
    setOrigin(state, action) {
      const paypload = action.payload || {};
      state.origin = { ...paypload?.origin };
      state.destination = { ...paypload?.destination };
    },
  },
});

export const { setOrigin } = coordenates.actions;
export default coordenates.reducer;
