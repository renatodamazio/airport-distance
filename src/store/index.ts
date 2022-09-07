import { configureStore } from "@reduxjs/toolkit";
import coordenates from "./reducers/coordenates";
import distances from "./reducers/distances";
import maps from "./reducers/maps";
import travel from "./reducers/travel";

const store = configureStore({
  reducer: {
    coordenates,
    distances,
    travel,
    maps,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;