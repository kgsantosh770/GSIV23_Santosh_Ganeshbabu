import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../reducers/moviesReducer";

const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
})

export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store