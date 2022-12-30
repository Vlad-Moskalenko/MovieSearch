import { useEffect, useState } from 'react';

import css from './Home.module.css';

import { movieApi } from 'services/api';

import { MoviesList, PagePagination } from 'components';

export const Home = () => {
  const [page, setPage] = useState(1);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [totalResults, setTotalResults] = useState();

  useEffect(() => {
    movieApi.getTrendingMovies(page).then(({ results, total_results }) => {
      setTrendingMovies(results);
      setTotalResults(total_results);
    });
  }, [page]);

  return (
    <main className={css.home}>
      <div className={`container ${css.homeWrapper}`}>
        <MoviesList movies={trendingMovies} link="movies/" />
      </div>
      <PagePagination
        totalResults={totalResults}
        page={page}
        setPage={setPage}
      />
    </main>
  );
};
