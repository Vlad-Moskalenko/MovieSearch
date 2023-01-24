import { createSlice } from "@reduxjs/toolkit";

import { getMoviesGenres } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const moviesGenresSlice = createSlice({
  name: "moviesGenres",

  initialState: {
    genres: null,
    status: null,
  },

  extraReducers: builder => builder
    .addCase(getMoviesGenres.pending, handlePending)

    .addCase(getMoviesGenres.fulfilled, (state, {payload})=>{
      state.genres = payload.genres
      state.status = 'success'
    })

    .addCase(getMoviesGenres.rejected, handleError)
})

export const moviesGenresReducer = moviesGenresSlice.reducer
