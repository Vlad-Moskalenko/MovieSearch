import { createSlice } from "@reduxjs/toolkit";

import { getMoviesGenres } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const moviesGenresSlice = createSlice({
  name: "moviesGenres",

  initialState: {
    genres: [],
    isLoading: false,
    error: null
  },

  extraReducers: {
    [getMoviesGenres.rejected]:handleError,
    [getMoviesGenres.pending]:handlePending,
    [getMoviesGenres.fulfilled](state, {payload}){
      state.genres = payload.genres
      state.isLoading = false
      state.error = null
    }
  }
})

export const moviesGenresReducer = moviesGenresSlice.reducer
