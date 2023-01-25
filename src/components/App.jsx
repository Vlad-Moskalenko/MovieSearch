import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMoviesGenres } from 'redux/movies/operations';
import { getSavedMovies } from 'redux/library/operations';

import { AuthModal, SharedLayout } from 'components';
import { setLibraryMovies } from 'redux/library/librarySlice';

const Home = lazy(() => import('pages/Home/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const Library = lazy(() => import('pages/Library/Library'));

export const App = () => {
  const genres = useSelector(state => state.movies.genres);
  const isAuth = useSelector(state => state.auth.isAuth);
  const userId = useSelector(state => state.auth.user.id);
  const isModal = useSelector(state => state.auth.isModal);
  const [savedMovies, setSavedMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getMoviesGenres());
    }
  }, [dispatch, genres]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getSavedMovies({ userId: userId, setSavedMovies }));
    }
  }, [dispatch, isAuth, userId]);

  useEffect(() => {
    dispatch(setLibraryMovies(savedMovies));
  }, [savedMovies, dispatch]);

  return (
    <>
      {isModal && <AuthModal />}
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};
