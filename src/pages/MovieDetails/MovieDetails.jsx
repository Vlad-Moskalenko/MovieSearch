import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import {
  MovieDetailsMeta,
  AdditionalInfo,
  BackLink,
  NotFound,
  Spinner,
} from 'components';

import css from './MovieDetails.module.css';

import { movieApi } from 'services/api';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  const [status, setStatus] = useState('success');

  useEffect(() => {
    if (movieId) {
      setStatus('pending');

      movieApi
        .getMovieDetails(movieId)
        .then(data => {
          setMovieDetails(data);
          setStatus('success');
        })
        .catch(() => setStatus('error'));
    }
  }, [movieId, setStatus]);

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
      {status === 'pending' && <Spinner />}
    </main>
  );
};

export default MovieDetails;
