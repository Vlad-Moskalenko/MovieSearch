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

  extraReducers: builder => builder
  .addCase(getMovieDetails.pending, handlePending)

  .addCase(getMovieDetails.fulfilled, (state, {payload})=>{
    state.movieDetails = payload
    state.status = 'success'
  })

  .addCase(getMovieDetails.rejected, handleError)
})

export const movieDetailsReducer = movieDetailsSlice.reducer
