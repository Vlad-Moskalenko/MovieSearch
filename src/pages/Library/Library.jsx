import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'redux/features/authSlice';
import { toggleModal } from 'redux/features/authSlice';
import { MoviesList } from 'components';

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

    if (!isAuth) {
      dispatch(toggleModal(true));
    }
  }, [dispatch, email, password, isAuth]);

  return (
    isAuth && (
      <main>
        <MoviesList movies={movies} genres={genres} />
      </main>
    )
  );
};

export default Library;
