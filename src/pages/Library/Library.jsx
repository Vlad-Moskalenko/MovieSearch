import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleModal } from 'redux/auth/authSlice';
import { MoviesList, Spinner, NotFound } from 'components';
import { selectFilteredMovies } from 'redux/library/selectors';

const Library = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const isModal = useSelector(state => state.auth.isModal);
  const { status, libraryMovies } = useSelector(state => state.library);
  const filteredMovies = useSelector(selectFilteredMovies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(toggleModal(true));
    }
  }, [dispatch, isAuth]);

  return isAuth ? (
    <main>
      {status === 'success' &&
        (libraryMovies.length > 0 ? (
          <MoviesList movies={filteredMovies} />
        ) : (
          <p style={{ textAlign: 'center' }}>
            You don't have any movies yet...
          </p>
        ))}

      {status === 'error' && <NotFound />}

      {status === 'loading' && <Spinner />}
    </main>
  ) : (
    !isModal && (
      <main style={{ textAlign: 'center' }}>
        Sorry, but we couldn't find your movies till you are not authorized...
      </main>
    )
  );
};

export default Library;
