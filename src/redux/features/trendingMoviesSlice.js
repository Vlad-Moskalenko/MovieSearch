import { createSlice } from "@reduxjs/toolkit";

import { getTrendingMovies } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const trendingMoviesSlice = createSlice({
  name: 'trendingMovies',

  initialState: {
    trendingMovies: [],
    totalResults: 0,
    status: null
  },

  extraReducers: {
    [getTrendingMovies.rejected]:handleError,
    [getTrendingMovies.pending]:handlePending,
    [getTrendingMovies.fulfilled](state, {payload}){
      state.trendingMovies = payload.results
      state.totalResults = payload.total_results
      state.status = 'success'
    }
  }
})

export const trendingMoviesReducer = trendingMoviesSlice.reducer
