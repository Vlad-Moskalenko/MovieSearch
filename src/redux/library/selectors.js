import { createSelector } from "@reduxjs/toolkit"

const selectFilter = state => state.library.filter
const selectLibraryMovies = state => state.library.libraryMovies

export const selectFilteredMovies = createSelector([selectFilter, selectLibraryMovies],
  (filter, movies) => movies.filter(movie => movie.title.toLowerCase().includes(filter.trim().toLowerCase()))
)
