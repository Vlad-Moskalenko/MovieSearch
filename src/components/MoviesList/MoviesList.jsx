import css from './MoviesList.module.css';

import { MovieCard } from 'components';

export const MoviesList = ({ movies }) => (
  <ul className={css.moviesList}>
    {movies.length > 0 &&
      movies.map(movie => <MovieCard key={movie.id} movieData={movie} />)}
  </ul>
);
