import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getTrendingMovies } from 'redux/movies/operations';
import { getSearchMovie } from 'redux/movies/operations';

import { MoviesList, NotFound, PagePagination, Spinner } from 'components';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const dispatch = useDispatch();
  const { movies, status, totalResults } = useSelector(state => state.movies);

  useEffect(() => {
    if (!query) {
      dispatch(getTrendingMovies(page));
      return;
    }

    dispatch(getSearchMovie({ query, page }));
  }, [query, page, dispatch]);

  const setQueryString = page => setSearchParams({ query: query, ...page });

  return (
    <main>
      {status !== 'error' && (
        <>
          <MoviesList movies={movies} />
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
