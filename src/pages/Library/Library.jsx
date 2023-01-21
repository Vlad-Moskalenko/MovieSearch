import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'redux/features/authSlice';
import { MoviesList } from 'components';
import { db } from 'firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import { getLibraryMovies } from 'redux/features/librarySlice';

const Library = ({ genres }) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const { email, password } = useSelector(state => state.auth.user);
  const movies = useSelector(state => state.library.movies);

  const dispatch = useDispatch(setUser());

  useEffect(() => {
    if (email && password) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        dispatch(
          setUser({
            isAuth: true,
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
      });
    }
  }, [dispatch, email, password]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'filmoteka'), snapshot => {
        let data = [];
        snapshot.docs.forEach(doc => {
          data.push(doc.data());
        });
        dispatch(getLibraryMovies(data));
      }),
    [dispatch]
  );

  return isAuth ? (
    <main>
      <MoviesList movies={movies} genres={genres} />
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Library;
