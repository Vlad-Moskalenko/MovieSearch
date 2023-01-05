import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy } from 'react';

import { movieApi } from 'services/api';

import { Cast, Reviews, SharedLayout, ErrorProvider } from 'components';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));

export const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    movieApi.getGenres().then(({ genres }) => setGenres(genres));
  }, []);

  return (
    <>
      <ErrorProvider>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home genres={genres} />} />
            <Route path="movies" element={<Movies genres={genres} />} />
            <Route path="movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Home genres={genres} />} />
          </Route>
        </Routes>
      </ErrorProvider>
    </>
  );
};
