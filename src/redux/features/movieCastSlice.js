import { createSlice } from "@reduxjs/toolkit";

import { getMovieCast } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const movieCastSlice = createSlice({
  name: "movieCast",

  initialState: {
    cast: [],
    isLoading: false,
    error: null
  },

  extraReducers: {
    [getMovieCast.rejected]:handleError,
    [getMovieCast.pending]:handlePending,
    [getMovieCast.fulfilled](state, {payload}){
      state.cast = payload.cast
      state.isLoading = false
      state.error = null
    }
  }
})

export const movieCastReducer = movieCastSlice.reducer
