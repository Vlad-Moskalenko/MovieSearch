import { createSlice } from "@reduxjs/toolkit"

import { addMovie, deleteMovie, getSavedMovies} from "./operations";
import { handleError, handlePending, handleFulfilled } from "services/handleFetch";

const librarySlice = createSlice({
  name: "library",

  initialState: {
    libraryMovies: [],
    status: null,
  },

  reducers: {
    setLibraryMovies(state, {payload}){
      state.libraryMovies = payload
      state.status = 'success'
    },

    clearLibraryMovies(state){
      state.libraryMovies = []
      state.status = null
    }
  },

  extraReducers: builder => builder
  .addCase(addMovie.pending, handlePending)
  .addCase(deleteMovie.pending, handlePending)
  .addCase(getSavedMovies.pending, handlePending)

  .addCase(addMovie.rejected, handleError)
  .addCase(deleteMovie.rejected, handleError)
  .addCase(getSavedMovies.rejected, handleError)

  .addCase(addMovie.fulfilled, handleFulfilled)

  .addCase(deleteMovie.fulfilled, handleFulfilled)

  .addCase(getSavedMovies.fulfilled, handlePending)
})

export const libraryReducer = librarySlice.reducer
export const {setLibraryMovies, clearLibraryMovies} = librarySlice.actions
