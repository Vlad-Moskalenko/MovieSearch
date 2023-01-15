import { createSlice } from "@reduxjs/toolkit";

import { getMovieCast } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const movieCastSlice = createSlice({
  name: "movieCast",

  initialState: {
    cast: [],
    status: null,
  },

  extraReducers: {
    [getMovieCast.rejected]:handleError,
    [getMovieCast.pending]:handlePending,
    [getMovieCast.fulfilled](state, {payload}){
      state.cast = payload.cast
      state.status = 'success'
    }
  }
})

export const movieCastReducer = movieCastSlice.reducer
