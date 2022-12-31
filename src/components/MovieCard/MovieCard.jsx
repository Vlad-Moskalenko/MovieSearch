import css from './MovieCard.module.css';
import image404 from '../../images/404.jpg';
import { getGenres } from 'services/getGenres';

import { Link, useLocation } from 'react-router-dom';

export const MovieCard = ({ movieData, genres, link = '' }) => {
  const location = useLocation();

  const { poster_path, title, release_date, genre_ids, id, vote_average } =
    movieData;

  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : image404;

  const genresString = getGenres(genres, genre_ids);

  return (
    <li className={css.movie} id={id}>
      <Link to={link + id} state={{ from: location }}>
        <div className={css.movieWrapper}>
          <img
            loading="lazy"
            className={css.moviePoster}
            src={imageSrc}
            alt={title}
          />
          <div className={css.movieMeta}>
            <h2 className={css.movieTitle} title={title}>
              {title}{' '}
              <span className={css.vote}>{vote_average.toFixed(1)}</span>
            </h2>
            <p className={css.movieGenre}>
              <span className={css.genres}>{genresString}</span> |{' '}
              {release_date ? parseInt(release_date) : '-'}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
