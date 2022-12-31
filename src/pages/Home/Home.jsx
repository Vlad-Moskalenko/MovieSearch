import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { movieApi } from 'services/api';

import { MoviesList, PagePagination } from 'components';

export const Home = ({ genres }) => {
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
    <main>
      {trendingMovies.length > 0 && (
        <MoviesList genres={genres} movies={trendingMovies} link="movies/" />
      )}
      {totalResults > 20 && (
        <PagePagination
          totalResults={totalResults}
          currentPage={page}
          setPage={setSearchParams}
        />
      )}
    </main>
  );
};
