import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IMoviesData, fetchUpcomingMovies } from '../../api/moviesApi'

interface IMoviesReducerState {
  movies: IMoviesData,
  loading: boolean,
  error: null | string | undefined,
}

export const getUpcomingMovies = createAsyncThunk('movies/getUpcoming', async (page: number) => {
  const pageNumber = page ?? 1
  const response = await fetchUpcomingMovies(pageNumber);
  return response;
});

export const moviesReducer = createSlice({
  name: 'movie',
  initialState: {
    movies: {},
    loading: false,
    error: null,
  } as IMoviesReducerState,
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