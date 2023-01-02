import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { MovieDetailsMeta, AdditionalInfo, BackLink } from 'components';

import css from './MovieDetails.module.css';

import { movieApi } from 'services/api';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    if (movieId) {
      movieApi.getMovieDetails(movieId).then(data => setMovieDetails(data));
    }
  }, [movieId]);

  return (
    <main className={css.movieDetailsWrapper}>
      <BackLink location={backLinkHref} />
      <MovieDetailsMeta movieDetails={movieDetails}>
        <AdditionalInfo location={backLinkHref} />
      </MovieDetailsMeta>
    </main>
  );
};
