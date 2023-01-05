import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import {
  MovieDetailsMeta,
  AdditionalInfo,
  BackLink,
  NotFound,
} from 'components';

import css from './MovieDetails.module.css';

import { movieApi } from 'services/api';
import { useError } from 'components/ErrorProvider/ErrorProvider';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  const { error, setError } = useError();

  useEffect(() => {
    if (movieId) {
      movieApi
        .getMovieDetails(movieId)
        .then(data => {
          setMovieDetails(data);
        })
        .catch(() => setError(true));
    }
  }, [movieId, setError]);

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
    </main>
  );
};

export default MovieDetails;
