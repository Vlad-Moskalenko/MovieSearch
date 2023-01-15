import { createSlice } from "@reduxjs/toolkit";

import { getMovieDetails } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const movieDetailsSlice = createSlice({
  name: 'movieDetails',

  initialState: {
    movieDetails: {},
    status: null,
  },

  extraReducers: {
    [getMovieDetails.rejected]:handleError,
    [getMovieDetails.pending]:handlePending,
    [getMovieDetails.fulfilled](state, {payload}){
      state.movieDetails = payload
      state.status = 'success'
    }
  }
})

export const movieDetailsReducer = movieDetailsSlice.reducer
