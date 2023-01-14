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

  const { movieDetails, isLoading, error } = useSelector(selectMovieDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetails(movieId));
    }
  }, [movieId, dispatch]);

  return (
    <main className={css.movieDetailsWrapper}>
      {!error && (
        <>
          <BackLink location={backLinkHref} />
          <MovieDetailsMeta movieDetails={movieDetails}>
            <AdditionalInfo location={backLinkHref} />
          </MovieDetailsMeta>
        </>
      )}

      {error && <NotFound title="Oops, something went wrong..." />}

      {isLoading && <Spinner />}
    </main>
  );
};

export default MovieDetails;
