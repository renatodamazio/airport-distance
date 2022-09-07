import { createSlice } from "@reduxjs/toolkit";

export const maps = createSlice({
  initialState: {
    loaded: false,
    config: {
      id: "google-map-script",
      apiKey: "AIzaSyCjkCjzb4MdOpgMh8DSBXg3hfhnzH6cGJo",
      libraries: ["geometry", "drawing"],
      size: {
        width: 400,
        height: 500,
      },
      center: {
        lat: -3.745,
        lng: -38.523,
      },
    },
  },

  reducers: {
    setConfig(state, action) {
      state.config = {
        ...state.config,
        ...action.payload,
      };
    },
  },
});

export const { setConfig } = maps.actions;
export default maps.reducer;