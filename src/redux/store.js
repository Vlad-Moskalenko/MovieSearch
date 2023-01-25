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

import { moviesReducer } from "./movies/moviesSlice";
import { movieDetailsReducer } from "./movieDetails/movieDetailsSlice";
import { authReducer } from "./auth/authSlice";
import { libraryReducer } from "./library/librarySlice";

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ["user", "isAuth"]
}

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    auth: persistReducer(persistConfig, authReducer),
    library: libraryReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
