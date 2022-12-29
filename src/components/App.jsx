import { Routes, Route } from 'react-router-dom';

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
  return (
    <div>
      <Routes>
        <Route path="filmoteka-React/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
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
