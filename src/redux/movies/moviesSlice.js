import { createSlice } from "@reduxjs/toolkit";

import { getTrendingMovies, getSearchMovie, getMoviesGenres } from "./operations";
import { handleError, handlePending } from "services/handleFetch";

const moviesSlice = createSlice({
  name: 'movies',

  initialState: {
    movies: [],
    genres: [],
    totalResults: 0,
    status: null,
    scrollPosition: null,
  },

  reducers:{
    setScrollPosition(state, {payload}){
      state.scrollPosition = payload
    }
  },

  extraReducers: builder => builder
    .addCase(getTrendingMovies.pending, handlePending)
    .addCase(getSearchMovie.pending, handlePending)
    .addCase(getMoviesGenres.pending)

    .addCase(getTrendingMovies.rejected, handleError)
    .addCase(getSearchMovie.rejected, handleError)
    .addCase(getMoviesGenres.rejected)

    .addCase(getTrendingMovies.fulfilled, (state, {payload}) => {
      state.movies = payload.results
      state.totalResults = payload.total_results
      state.status = 'success'
      state.scrollPosition = null
    })

    .addCase(getSearchMovie.fulfilled, (state, {payload})=>{
      state.movies = payload.results
      state.totalResults = payload.total_results
      state.status = 'success'
      state.scrollPosition = null
    })

    .addCase(getMoviesGenres.fulfilled, (state, {payload})=>{
      state.genres = payload.genres
    })
})

export const moviesReducer = moviesSlice.reducer
export const {setScrollPosition} = moviesSlice.actions
