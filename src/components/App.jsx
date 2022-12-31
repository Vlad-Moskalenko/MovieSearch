import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { movieApi } from 'services/api';

import {
  Home,
  MovieDetails,
  Movies,
  NotFound,
  Cast,
  Reviews,
  SharedLayout,
} from 'components';

export const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    movieApi.getGenres().then(({ genres }) => setGenres(genres));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home genres={genres} />} />
          <Route path="movies" element={<Movies genres={genres} />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
