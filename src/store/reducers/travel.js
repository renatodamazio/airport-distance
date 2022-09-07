import { createSlice } from "@reduxjs/toolkit";

export const travels = createSlice({
  initialState: {
    travelMode: "",
    travelModeOptions: [
        {
            type: "DRIVING",
            icon: "drive"
        },
        {
            type: "BICYCLING",
            icon: "bike"
        },
        {
            type: "TRANSIT",
            icon: "transit"
        },
        {
            type: "WALKING",
            icon: "walk"
        }
    ]
  },
  reducers: {
    setTravelMode(state, action) {
        state.travelMode = state.travelModeOptions[action.payload]
    }
  }
});

export const { setTravelMode } = travels.actions;
export default travels.reducer;
