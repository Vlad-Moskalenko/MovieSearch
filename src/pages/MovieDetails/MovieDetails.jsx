import { useEffect, useState } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';

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

  const { title, poster_path, vote_average, release_date, overview, genres } =
    movieDetails;

  return (
    <div className={css.movieDetailsWrapper}>
      <NavLink to={backLinkHref}>Go Back</NavLink>;
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      <ul className={css.movieDetailsMeta}>
        <li>
          <h2>
            {title} | {Number.parseInt(release_date)}
          </h2>
          <p>User score: {vote_average}</p>
        </li>
        <li>
          <h3>Overview</h3>
          <p>{overview}</p>
        </li>
        <li>
          <h3>Genres</h3>
          <p>{genres > 0 && genres.map(genre => genre.name).join(', ')}</p>
        </li>
      </ul>
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
