import { configureStore } from "@reduxjs/toolkit";

import { trendingMoviesReducer } from "./features/trendingMoviesSlice";
import { searchMovieReducer } from "./features/searchMovieSlice";
import { movieDetailsReducer } from "./features/movieDetailsSlice";
import { moviesGenresReducer } from "./features/moviesGenresSlice";
import { movieCastReducer } from "./features/movieCastSlice";
import { movieReviewsReducer } from "./features/movieReviewsSlice";

export const store = configureStore({
  reducer: {
    trendingMovies: trendingMoviesReducer,
    searchMovie: searchMovieReducer,
    movieDetails: movieDetailsReducer,
    moviesGenres: moviesGenresReducer,
    movieCast: movieCastReducer,
    movieReviews: movieReviewsReducer
  }
})
