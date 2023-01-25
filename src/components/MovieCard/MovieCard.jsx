import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import css from './MovieCard.module.css';

import { NotFound } from 'components';
import { selectGenresObj } from 'redux/movies/selectors';

export const MovieCard = ({ movieData }) => {
  const location = useLocation();
  const genresObj = useSelector(selectGenresObj);

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
    genres,
  } = movieData;

  const genresString = genres
    ? genres.map(genre => genre.name).join(', ')
    : genre_ids.map(id => genresObj[id]).join(', ');

  return (
    <li id={id}>
      <Link className={css.movie} to={`/${id}`} state={{ from: location }}>
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
