import css from './MovieDetailsMeta.module.css';
import image404 from '../../images/404.jpg';

export const MovieDetailsMeta = ({ movieDetails }) => {
  const { title, poster_path, vote_average, release_date, overview, genres } =
    movieDetails;

  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : image404;

  return (
    <>
      <img src={imageSrc} alt={title} />
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
    </>
  );
};
