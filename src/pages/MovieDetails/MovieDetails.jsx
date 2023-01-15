import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectMovieDetails } from 'redux/selectors';
import { getMovieDetails } from 'redux/operations';

import {
  MovieDetailsMeta,
  AdditionalInfo,
  BackLink,
  NotFound,
  Spinner,
} from 'components';

import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const { movieDetails, status } = useSelector(selectMovieDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetails(movieId));
    }
  }, [movieId, dispatch]);

  return (
    <main className={css.movieDetailsWrapper}>
      {status === 'success' && (
        <>
          <BackLink location={backLinkHref} />
          <MovieDetailsMeta movieDetails={movieDetails}>
            <AdditionalInfo location={backLinkHref} />
          </MovieDetailsMeta>
        </>
      )}

      {status === 'error' && <NotFound title="Oops, something went wrong..." />}

      {status === 'loading' && <Spinner />}
    </main>
  );
};

export default MovieDetails;
