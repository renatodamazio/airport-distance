import { createSlice } from "@reduxjs/toolkit";

export const loading = createSlice({
  name: "loading",
  initialState: {
    load: false,
  },

  reducers: {
    setLoad(state, action) {
      state.load = action.payload;
    },
  },
});

export const { setLoad } = loading.actions;
export default loading.reducer;
