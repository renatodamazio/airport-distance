import { configureStore } from "@reduxjs/toolkit";
import coordenates from "./reducers/coordenates";
import distance from "../utils/distance";

export default configureStore({
    reducer: {
        coordenates,
        distance
    }
})