import { useEffect, useState } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';

import { MovieDetailsMeta } from 'components';

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
    <div className={css.movieDetailsWrapper}>
      <NavLink to={backLinkHref}>Go Back</NavLink>;
      <MovieDetailsMeta movieDetails={movieDetails} />
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: backLinkHref }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: backLinkHref }}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};
