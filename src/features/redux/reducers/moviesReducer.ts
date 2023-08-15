import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IMoviesData, fetchUpcomingMovies } from '../../api/moviesApi'

interface IMoviesReducerState {
  movies: IMoviesData,
  loading: boolean,
  error: null | string | undefined,
}

export const getUpcomingMovies = createAsyncThunk('movies/getUpcoming', async () => {
  const response = await fetchUpcomingMovies();
  return response;
});

export const moviesReducer = createSlice({
  name: 'movie',
  initialState: <IMoviesReducerState>{
    movies: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default moviesReducer.reducer