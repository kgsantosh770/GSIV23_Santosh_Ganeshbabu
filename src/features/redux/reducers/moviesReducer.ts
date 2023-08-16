import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IMoviesData, fetchUpcomingMovies, searchMovie } from '../../api/moviesApi'
import { StoreState } from '../store/store';

export interface IMoviesReducerState {
  movies: IMoviesData,
  loading: boolean,
  error: null | string | undefined,
  searchText: string,
}

export const getUpcomingMovies = createAsyncThunk('movies/getUpcoming', async (page: number) => {
  const pageNumber = page ?? 1
  const response = await fetchUpcomingMovies(pageNumber);
  return response;
});

export const getSearchResults = createAsyncThunk('movies/search', async (page: number, thunkAPI) => {
  const pageNumber = page ?? 1
  const state: StoreState = thunkAPI.getState() as StoreState;
  const response = await searchMovie(state.movies.searchText, pageNumber);
  return response;
});

export const moviesReducer = createSlice({
  name: 'movie',
  initialState: {
    movies: {},
    loading: false,
    error: null,
    searchText: '',
  } as IMoviesReducerState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
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
      .addCase(getSearchResults.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setSearchText } = moviesReducer.actions;
export default moviesReducer.reducer