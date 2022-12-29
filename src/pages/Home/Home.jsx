import { useEffect, useState } from 'react';

import css from './Home.module.css';

import { movieApi } from 'services/api';

import { MoviesList } from 'components';

export const Home = () => {
  const [page] = useState(1);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    movieApi
      .getTrendingMovies(page)
      .then(({ results }) => setTrendingMovies(results));
  }, [page]);

  return (
    <main className={css.home}>
      <div className={`container ${css.homeWrapper}`}>
        <MoviesList movies={trendingMovies} link="movies/" />
      </div>
    </main>
  );
};
