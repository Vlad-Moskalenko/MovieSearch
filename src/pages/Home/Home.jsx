import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { movieApi } from 'services/api';
import { useStatus } from 'components/StatusProvider/StatusProvider';

import { MoviesList, NotFound, PagePagination, Spinner } from 'components';

export const Home = ({ genres }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState();
  const page = Number(searchParams.get('page')) || 1;
  const { status, setStatus } = useStatus();

  useEffect(() => {
    setStatus('pending');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    movieApi
      .getTrendingMovies(page)
      .then(({ results, total_results }) => {
        setTrendingMovies(results);
        setTotalResults(total_results);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [page, setStatus]);

  return (
    <main>
      {(status === 'success' || status === 'pending') && (
        <>
          <MoviesList genres={genres} movies={trendingMovies} link="movies/" />
          {totalResults > 20 && (
            <PagePagination
              totalResults={totalResults}
              currentPage={page}
              setPage={setSearchParams}
            />
          )}
        </>
      )}
      {status === 'error' && <NotFound />}
      {status === 'pending' && <Spinner />}
    </main>
  );
};
