import { configureStore } from "@reduxjs/toolkit";
import coordenates from "./reducers/coordenates";
import distances from "./reducers/distances";
import maps from "./reducers/maps";
import travel from "./reducers/travel";
export default configureStore({
  reducer: {
    coordenates,
    distances,
    travel,
    maps,
  },
});
