import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ISingleMovie, fetchMovie } from '../../api/moviesApi'

interface ISingleMovieReducer {
  movieData: ISingleMovie,
  loading: boolean,
  error: null | string | undefined,
}

export const getMovie = createAsyncThunk('movies/getMovie', async (id: number) => {
  const response = await fetchMovie(id);
  return response;
});

export const singleMovieReducer = createSlice({
  name: 'singleMovie',
  initialState: {
    movieData: {},
    loading: false,
    error: null,
  } as ISingleMovieReducer,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false
        state.movieData = action.payload
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default singleMovieReducer.reducer