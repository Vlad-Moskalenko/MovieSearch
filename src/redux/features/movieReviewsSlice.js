import { createSlice } from "@reduxjs/toolkit";

import { getMovieReviews } from "redux/operations";
import { handleError } from "services/handleError";
import { handlePending } from "services/handlePending";

const movieReviewsSlice = createSlice({
  name: "movieReviews",

  initialState: {
    reviews: [],
    status: null,
  },

  extraReducers: {
    [getMovieReviews.rejected]: handleError,
    [getMovieReviews.pending]: handlePending,
    [getMovieReviews.fulfilled](state, {payload}){
      state.reviews = payload.results
      state.status = 'success'
    }
  }
})

export const movieReviewsReducer = movieReviewsSlice.reducer
