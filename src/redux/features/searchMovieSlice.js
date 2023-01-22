// import { createSlice } from "@reduxjs/toolkit";

// import { getSearchMovie } from "redux/operations";
// import { handleError } from "services/handleError";
// import { handlePending } from "services/handlePending";

// const searchMovieSlice = createSlice({
//   name: 'searchMovie',

//   initialState: {
//     searchMovies: [],
//     totalResults: 0,
//     status: null
//   },

//   reducers: {
//     clearSearchMovies(state){
//       state.searchMovies = [];
//       state.totalResults = 0;
//       state.status = null;
//     }
//   },

//   extraReducers: builder => builder
//     .addCase(getSearchMovie.pending, handlePending)

//     .addCase(getSearchMovie.fulfilled, (state, {payload})=>{
//       state.searchMovies = payload.results
//       state.totalResults = payload.total_results
//       state.status = 'success'
//     })

//     .addCase(getSearchMovie.rejected, handleError)
// })

// export const searchMovieReducer = searchMovieSlice.reducer

// export const {clearSearchMovies} = searchMovieSlice.actions
