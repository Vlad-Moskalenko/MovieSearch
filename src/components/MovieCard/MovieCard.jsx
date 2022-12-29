import css from './MovieCard.module.css';

import { Link, useLocation } from 'react-router-dom';

export const MovieCard = ({ movieData, link = '' }) => {
  const location = useLocation();

  const { poster_path, title, release_date, genre_ids, id, vote_average } =
    movieData;

  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : '../../images/404.jpg';

  return (
    <li className={css.movie} id={id}>
      <Link to={link + id} state={{ from: location }}>
        <div className={css.posterWrapper}>
          <img
            loading="lazy"
            className={css.moviePoster}
            src={imageSrc}
            alt={title}
          />
        </div>
        <div className={css.movieMeta}>
          <h2 className={css.movieTitle} title={title}>
            {title}
          </h2>
          <p className={css.movieGenre}>
            <span className={css.genres}>{genre_ids}</span> |{' '}
            {release_date ? parseInt(release_date) : '-'}
            <span className={css.vote}>{vote_average.toFixed(1)}</span>
          </p>
        </div>
      </Link>
    </li>
  );
};
