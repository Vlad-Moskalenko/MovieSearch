import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { MoviesList, NotFound, PagePagination, Spinner } from 'components';
import { selectTrendingMovies } from 'redux/selectors';
import { getTrendingMovies } from 'redux/operations';

const Home = ({ genres }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { trendingMovies, isLoading, error, totalResults } =
    useSelector(selectTrendingMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingMovies(page));
  }, [page, dispatch]);

  return (
    <main>
      {(!error || isLoading) && (
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

      {error && <NotFound />}

      {isLoading && <Spinner />}
    </main>
  );
};

export default Home;
