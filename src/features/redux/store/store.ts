import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../reducers/moviesReducer";
import singleMovieReducer from "../reducers/singleMovieReducer";

const store = configureStore({
    reducer: {
        singleMovie: singleMovieReducer,
        movies: moviesReducer,
    },
})

export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store