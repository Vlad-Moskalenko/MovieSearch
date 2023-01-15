import css from './MovieDetailsMeta.module.css';

import { NotFound } from 'components';

export const MovieDetailsMeta = ({ movieDetails, children }) => {
  const {
    title,
    original_title,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    overview,
    genres,
  } = movieDetails;

  return (
    <article className={css.movieMetaWrapper}>
      {poster_path ? (
        <img
          className={css.moviePoster}
          src={`https://image.tmdb.org/t/p/w500/${
            poster_path || backdrop_path
          }`}
          alt={title || original_title}
        />
      ) : (
        <NotFound className={css.moviePoster} />
      )}
      <div>
        <ul className={css.movieMeta}>
          <li className={css.movieMetaItem}>
            <h2 className={css.movieTitle}>
              {title || 'unknown'} |{' '}
              {Number.parseInt(release_date) || 'unknown'}
              <span className={css.movieRating}>
                {vote_average?.toFixed(1)}
              </span>
            </h2>
          </li>
          <li className={css.movieMetaItem}>
            <h3>Overview</h3>
            <p>{overview || 'Can`t find overview...'}</p>
          </li>
          <li className={css.movieMetaItem}>
            <h3>Genres</h3>
            <p>
              {genres?.length > 0
                ? genres.map(genre => genre.name).join(', ')
                : 'Unknown genre'}
            </p>
          </li>
        </ul>
        {children}
      </div>
    </article>
  );
};
