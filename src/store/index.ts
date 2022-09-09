import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import coordenates from "./reducers/coordenates";
import distances from "./reducers/distances";
import maps from "./reducers/maps";
import travel from "./reducers/travel";
import loading from "./reducers/loading";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  middleware: customizedMiddleware,
  reducer: {
    coordenates,
    distances,
    travel,
    loading,
    maps,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;