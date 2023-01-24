import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from 'firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import { getLibraryMovies } from 'redux/features/librarySlice';

import { AuthModal, SharedLayout } from 'components';
import { getMoviesGenres } from 'redux/operations';

const Home = lazy(() => import('pages/Home/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const Library = lazy(() => import('pages/Library/Library'));

export const App = () => {
  const genres = useSelector(state => state.moviesGenres.genres);
  const isAuth = useSelector(state => state.auth.isAuth);
  const userId = useSelector(state => state.auth.user.id);
  const isModal = useSelector(state => state.auth.isModal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres) {
      dispatch(getMoviesGenres());
    }
  }, [dispatch, genres]);

  useEffect(() => {
    if (isAuth) {
      onSnapshot(collection(db, `${userId}`), snapshot => {
        let data = [];
        snapshot.docs.forEach(doc => {
          data.push(doc.data());
        });
        dispatch(getLibraryMovies(data));
      });
    }
  }, [dispatch, isAuth, userId]);

  return (
    <>
      {isModal && <AuthModal />}
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home genres={genres} />} />
          <Route path="/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/library" element={<Library genres={genres} />} />
          <Route path="*" element={<Home genres={genres} />} />
        </Route>
      </Routes>
    </>
  );
};
