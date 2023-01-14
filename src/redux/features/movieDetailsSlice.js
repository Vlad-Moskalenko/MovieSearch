import { createSlice } from "@reduxjs/toolkit";

import { getMovieDetails } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const movieDetailsSlice = createSlice({
  name: 'movieDetails',

  initialState: {
    movieDetails: {},
    isLoading: false,
    error: null
  },

  extraReducers: {
    [getMovieDetails.rejected]:handleError,
    [getMovieDetails.pending]:handlePending,
    [getMovieDetails.fulfilled](state, {payload}){
      state.movieDetails = payload
      state.isLoading = false
      state.error = null
    }
  }
})

export const movieDetailsReducer = movieDetailsSlice.reducer
