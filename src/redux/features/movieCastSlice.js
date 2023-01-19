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

  extraReducers: builder => builder
  .addCase(getMovieCast.pending, handlePending)

  .addCase(getMovieCast.fulfilled, (state, {payload}) => {
      state.cast = payload.cast
      state.status = 'success'
    })

  .addCase(getMovieCast.rejected, handleError)
})

export const movieCastReducer = movieCastSlice.reducer
