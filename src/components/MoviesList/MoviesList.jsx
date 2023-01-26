import { debounce } from 'debounce';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import css from './MoviesList.module.css';

import { setScrollPosition } from 'redux/movies/moviesSlice';

import { MovieCard } from 'components';

export const MoviesList = ({ movies }) => {
  const scrollPosition = useSelector(state => state.movies.scrollPosition);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: scrollPosition,
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    //eslint-disable-next-line
  }, []);

  const handleScroll = debounce(() => {
    dispatch(setScrollPosition(window.scrollY));
  }, 1000);

  return (
    <ul className={css.moviesList}>
      {movies.length > 0 &&
        movies.map(movie => <MovieCard key={movie.id} movieData={movie} />)}
    </ul>
  );
};
