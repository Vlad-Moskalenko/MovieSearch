import { createSlice } from "@reduxjs/toolkit";

import { getMovieDetails,  getMovieReviews, getMovieCast, getMovieTrailer} from "./operations";
import { handleError, handlePending } from "services/handleFetch";

const movieDetailsSlice = createSlice({
  name: 'movieDetails',

  initialState: {
    movieDetails: {},
    cast: {
      castList: [],
      status: null
    },
    reviews: {
      reviewsList: [],
      status: null
    },
    status: null,
    movieTrailer: {
      trailerData: {},
      status: null,
      isModal: false
    }
  },

  reducers: {
    closeModal(state){
      state.movieTrailer.toggleModal = false
      state.movieTrailer.status = null
    }
  },

  extraReducers: builder => builder
  .addCase(getMovieDetails.pending, handlePending)
  .addCase(getMovieCast.pending, state => handlePending(state.cast))
  .addCase(getMovieReviews.pending, state => handlePending(state.reviews))
  .addCase(getMovieTrailer.pending, state => handlePending(state.movieTrailer))

  .addCase(getMovieDetails.rejected, handleError)
  .addCase(getMovieCast.rejected, state => handleError(state.cast))
  .addCase(getMovieReviews.rejected, state => handleError(state.reviews))
  .addCase(getMovieTrailer.rejected, state => handleError(state.movieTrailer))

  .addCase(getMovieDetails.fulfilled, (state, {payload})=>{
    state.movieDetails = payload
    state.status = 'success'
  })

  .addCase(getMovieCast.fulfilled, (state, {payload}) => {
      state.cast.castList = payload.cast
      state.cast.status = 'success'
    })

  .addCase(getMovieReviews.fulfilled, (state, {payload}) =>{
    state.reviews.reviewsList = payload.results
    state.reviews.status = 'success'
  })

  .addCase(getMovieTrailer.fulfilled, (state, {payload}) =>{
    state.movieTrailer.trailerData = payload.results[0]
    state.movieTrailer.status = 'success'
    state.movieTrailer.isModal = true
  })
})

export const movieDetailsReducer = movieDetailsSlice.reducer
export const {closeModal} = movieDetailsSlice.actions
