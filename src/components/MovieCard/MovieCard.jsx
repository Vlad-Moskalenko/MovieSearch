import css from './MovieCard.module.css';

import { getGenres } from 'services/getGenres';

import { Link, useLocation } from 'react-router-dom';

import { NotFound } from 'components';

export const MovieCard = ({ movieData, genres }) => {
  const location = useLocation();

  const {
    poster_path,
    backdrop_path,
    title,
    original_title,
    release_date,
    genre_ids,
    id,
    vote_average,
    popularity,
    genres: genresArr,
  } = movieData;

  const genresString = genresArr
    ? genresArr.map(genre => genre.name).join(', ')
    : getGenres(genres, genre_ids);

  return (
    <li id={id}>
      <Link
        className={css.movie}
        to={`/movies/${id}`}
        state={{ from: location }}
      >
        <div className={css.movieWrapper}>
          {poster_path ? (
            <img
              loading="lazy"
              className={css.moviePoster}
              src={`https://image.tmdb.org/t/p/w500/${
                poster_path || backdrop_path
              }`}
              alt={title}
            />
          ) : (
            <NotFound className={css.moviePoster} />
          )}
          <div className={css.movieMeta}>
            <h2 className={css.movieTitle} title={title || original_title}>
              {title}
              <span className={css.vote}>
                {vote_average.toFixed(1) || popularity.toFixed(1)}
              </span>
            </h2>
            <p className={css.movieGenre}>
              <span className={css.genres}>{genresString || ''}</span>
              <span className={css.releaseDate}>
                {release_date ? parseInt(release_date) : '-'}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
