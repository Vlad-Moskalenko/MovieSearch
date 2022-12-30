import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './Home.module.css';

import { movieApi } from 'services/api';

import { MoviesList, PagePagination } from 'components';

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState();
  const page = Number(searchParams.get('page')) || 1;

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
        <PagePagination
          totalResults={totalResults}
          currentPage={page}
          setPage={setSearchParams}
        />
      </div>
    </main>
  );
};
