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
  const trailerStatus = useSelector(
    state => state.movieDetails.movieTrailer.status
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [movieId, dispatch]);

  return (
    <main className={css.movieDetailsWrapper}>
      {status === 'success' && (
        <>
          <MovieDetailsMeta>
            <BackLink location={backLinkHref} />
            <AdditionalInfo location={backLinkHref} />
          </MovieDetailsMeta>
        </>
      )}

      {status === 'error' && <NotFound title="Oops, something went wrong..." />}

      {status === 'loading' && <Spinner />}

      {trailerStatus === 'success' && <TrailerMovieModal />}
    </main>
  );
};

export default MovieDetails;
