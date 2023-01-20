import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { trendingMoviesReducer } from "./features/trendingMoviesSlice";
import { searchMovieReducer } from "./features/searchMovieSlice";
import { movieDetailsReducer } from "./features/movieDetailsSlice";
import { moviesGenresReducer } from "./features/moviesGenresSlice";
import { movieCastReducer } from "./features/movieCastSlice";
import { movieReviewsReducer } from "./features/movieReviewsSlice";
import { authReducer } from "./features/authSlice";

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ["user", "isAuth"]
}

export const store = configureStore({
  reducer: {
    trendingMovies: trendingMoviesReducer,
    searchMovie: searchMovieReducer,
    movieDetails: movieDetailsReducer,
    moviesGenres: moviesGenresReducer,
    movieCast: movieCastReducer,
    movieReviews: movieReviewsReducer,
    auth: persistReducer(persistConfig, authReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
