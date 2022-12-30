import 'rc-pagination/assets/index.css';

import { useEffect, useState } from 'react';
import Pagination from 'rc-pagination';

// import ReactPaginate from 'react-paginate';

import css from './Home.module.css';

import { movieApi } from 'services/api';

import { MoviesList } from 'components';

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

  const handlePageClick = e => setPage(e);

  return (
    <main className={css.home}>
      <div className={`container ${css.homeWrapper}`}>
        <MoviesList movies={trendingMovies} link="movies/" />
      </div>
      <Pagination
        onChange={handlePageClick}
        current={page}
        total={totalResults}
        pageSize={20}
        showLessItems
        showTitle={false}
      />
    </main>
  );
};
