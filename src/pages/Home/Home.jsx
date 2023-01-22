import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { MoviesList, NotFound, PagePagination, Spinner } from 'components';
import { selectTrendingMovies } from 'redux/selectors';
import { getTrendingMovies } from 'redux/operations';

import { getSearchMovie } from 'redux/operations';

const Home = ({ genres }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { trendingMovies, status, totalResults } =
    useSelector(selectTrendingMovies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) {
      dispatch(getTrendingMovies(page));
    }

    if (query) {
      dispatch(getSearchMovie({ query, page }));
    }
  }, [query, page, dispatch]);

  const setQueryString = page => setSearchParams({ query: query, ...page });

  return (
    <main>
      {status !== 'error' && (
        <>
          <MoviesList genres={genres} movies={trendingMovies} link="movies/" />
          <PagePagination
            totalResults={totalResults}
            currentPage={page}
            setPage={setQueryString}
          />
        </>
      )}

      {status === 'error' && <NotFound />}

      {status === 'loading' && <Spinner />}
    </main>
  );
};

export default Home;
