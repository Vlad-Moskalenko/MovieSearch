import { createSelector } from "@reduxjs/toolkit";

const selectGenres = state => state.movies.genres

export const selectGenresObj = createSelector([selectGenres], genres => {
  return Object.fromEntries(genres.map(item => Object.values(item)))
})
