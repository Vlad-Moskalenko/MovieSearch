import { createSlice } from "@reduxjs/toolkit"
import { addMovie, deleteMovie} from "redux/operations";


const librarySlice = createSlice({
  name: "library",

  initialState: {
    movies: [],
    status: null,
  },

  reducers: {
    getLibraryMovies(state, {payload}){
      state.movies = payload
    },

    clearLibraryMovies(state){
      state.movies = []
      state.status = null
    }
  },

  extraReducers: builder => builder
  .addCase(addMovie.fulfilled, (state) => {
    state.status = 'success'
  })

  .addCase(deleteMovie.fulfilled, (state) => {
    state.status = 'success'
  })
})

export const libraryReducer = librarySlice.reducer
export const {getLibraryMovies, clearLibraryMovies} = librarySlice.actions
