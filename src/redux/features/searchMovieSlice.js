import { createSlice } from "@reduxjs/toolkit";

import { getSearchMovie } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const searchMovieSlice = createSlice({
  name: 'searchMovie',

  initialState: {
    searchMovies: [],
    totalResults: 0,
    isLoading: false,
    error: null
  },

  extraReducers: {
    [getSearchMovie.rejected]:handleError,
    [getSearchMovie.pending]:handlePending,
    [getSearchMovie.fulfilled](state, {payload}){
      state.searchMovies = payload.results
      state.totalResults = payload.total_results
      state.isLoading = false
      state.error = null
    }
  }
})

export const searchMovieReducer = searchMovieSlice.reducer
