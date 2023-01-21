import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SharedLayout } from 'components';
import { getMoviesGenres } from 'redux/operations';
import { selectMoviesGenres } from 'redux/selectors';

const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const Library = lazy(() => import('pages/Library/Library'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));

export const App = () => {
  const { genres } = useSelector(selectMoviesGenres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesGenres());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home genres={genres} />} />
          <Route path="/movies" element={<Movies genres={genres} />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/library" element={<Library genres={genres} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home genres={genres} />} />
        </Route>
      </Routes>
    </>
  );
};
