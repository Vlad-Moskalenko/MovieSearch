import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy } from 'react';

import { movieApi } from 'services/api';

import { SharedLayout, StatusProvider } from 'components';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    movieApi.getGenres().then(({ genres }) => setGenres(genres));
  }, []);

  return (
    <>
      <StatusProvider>
        <Routes>
          <Route path="filmoteka-React/" element={<SharedLayout />}>
            <Route index element={<Home genres={genres} />} />
            <Route
              path="filmoteka-React/movies"
              element={<Movies genres={genres} />}
            />
            <Route
              path="filmoteka-React/movies/:movieId"
              element={<MovieDetails />}
            >
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route
              path="filmoteka-React/*"
              element={<Home genres={genres} />}
            />
          </Route>
        </Routes>
      </StatusProvider>
    </>
  );
};
