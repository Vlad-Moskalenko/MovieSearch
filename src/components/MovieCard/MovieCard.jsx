import css from './MovieCard.module.css';

import { getGenres } from 'services/getGenres';

import { Link, useLocation } from 'react-router-dom';

import { NotFound } from 'components';

export const MovieCard = ({ movieData, genres, link = '' }) => {
  const location = useLocation();

  const { poster_path, title, release_date, genre_ids, id, vote_average } =
    movieData;

  const genresString = getGenres(genres, genre_ids);

  return (
    <li id={id}>
      <Link className={css.movie} to={link + id} state={{ from: location }}>
        <div className={`${css.movieWrapper} ${css.spinner}`}>
          {poster_path ? (
            <img
              loading="lazy"
              className={css.moviePoster}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
            />
          ) : (
            <NotFound className={css.moviePoster} />
          )}
          <div className={css.movieMeta}>
            <h2 className={css.movieTitle} title={title}>
              {title}
              <span className={css.vote}>{vote_average.toFixed(1)}</span>
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
