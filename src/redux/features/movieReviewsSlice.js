import { createSlice } from "@reduxjs/toolkit";

import { getMovieReviews } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const movieReviewsSlice = createSlice({
  name: "movieReviews",

  initialState: {
    reviews: [],
    isLoading: false,
    error: null
  },

  extraReducers: {
    [getMovieReviews.rejected]: handleError,
    [getMovieReviews.pending]: handlePending,
    [getMovieReviews.fulfilled](state, {payload}){
      state.reviews = payload.results
      state.isLoading = false
      state.error = null
    }
  }
})

export const movieReviewsReducer = movieReviewsSlice.reducer
