import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleModal } from 'redux/auth/authSlice';
import { MoviesList, Spinner, NotFound } from 'components';

const Library = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const { libraryMovies, status } = useSelector(state => state.library);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(toggleModal(true));
    }
  }, [dispatch, isAuth]);

  return (
    isAuth && (
      <main>
        {status === 'success' &&
          (libraryMovies.length > 0 ? (
            <MoviesList movies={libraryMovies} />
          ) : (
            <p style={{ textAlign: 'center' }}>
              You don't have any movies yet...
            </p>
          ))}

        {status === 'error' && <NotFound />}

        {status === 'loading' && <Spinner />}
      </main>
    )
  );
};

export default Library;
