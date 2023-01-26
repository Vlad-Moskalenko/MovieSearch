import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMovieDetails } from 'redux/movieDetails/operations';

import {
  MovieDetailsMeta,
  AdditionalInfo,
  BackLink,
  NotFound,
  Spinner,
  TrailerMovieModal,
} from 'components';

import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const status = useSelector(state => state.movieDetails.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [movieId, dispatch]);

  return (
    <main className={css.movieDetailsWrapper}>
      {status === 'success' && (
        <>
          <BackLink location={backLinkHref} />
          <MovieDetailsMeta>
            <AdditionalInfo location={backLinkHref} />
          </MovieDetailsMeta>
        </>
      )}

      {status === 'error' && <NotFound title="Oops, something went wrong..." />}

      {status === 'loading' && <Spinner />}

      <TrailerMovieModal />
    </main>
  );
};

export default MovieDetails;
