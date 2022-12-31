import css from './MovieDetailsMeta.module.css';
import image404 from '../../images/404.jpg';

export const MovieDetailsMeta = ({ movieDetails, children }) => {
  const { title, poster_path, vote_average, release_date, overview, genres } =
    movieDetails;

  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : image404;

  return (
    <article className={css.movieMetaWrapper}>
      <img className={css.moviePoster} src={imageSrc} alt={title} />
      <div>
        <ul className={css.movieMeta}>
          <li className={css.movieMetaItem}>
            <h2 className={css.movieTitle}>
              {title} | {Number.parseInt(release_date)}
              <span className={css.movieRating}>
                {vote_average?.toFixed(1)}
              </span>
            </h2>
          </li>
          <li className={css.movieMetaItem}>
            <h3>Overview</h3>
            <p>{overview}</p>
          </li>
          <li className={css.movieMetaItem}>
            <h3>Genres</h3>
            <p>
              {genres?.length > 0 && genres.map(genre => genre.name).join(', ')}
            </p>
          </li>
        </ul>
        {children}
      </div>
    </article>
  );
};
