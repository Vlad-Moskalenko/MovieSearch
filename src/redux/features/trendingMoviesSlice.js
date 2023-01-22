import { createSlice } from "@reduxjs/toolkit";

import { getTrendingMovies } from "redux/operations";
import { getSearchMovie } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const trendingMoviesSlice = createSlice({
  name: 'trendingMovies',

  initialState: {
    trendingMovies: [],
    totalResults: 0,
    status: null
  },

  extraReducers: builder => builder
    .addCase(getTrendingMovies.pending, handlePending)

    .addCase(getTrendingMovies.fulfilled, (state, {payload}) => {
      state.trendingMovies = payload.results
      state.totalResults = payload.total_results
      state.status = 'success'
    })

    .addCase(getTrendingMovies.rejected, handleError)

    .addCase(getSearchMovie.pending, handlePending)

    .addCase(getSearchMovie.fulfilled, (state, {payload})=>{
      state.trendingMovies = payload.results
      state.totalResults = payload.total_results
      state.status = 'success'
    })

    .addCase(getSearchMovie.rejected, handleError)
})

export const trendingMoviesReducer = trendingMoviesSlice.reducer
