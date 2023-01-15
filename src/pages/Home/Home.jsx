import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { MoviesList, NotFound, PagePagination, Spinner } from 'components';
import { selectTrendingMovies } from 'redux/selectors';
import { getTrendingMovies } from 'redux/operations';

const Home = ({ genres }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { trendingMovies, status, totalResults } =
    useSelector(selectTrendingMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingMovies(page));
  }, [page, dispatch]);

  return (
    <main>
      {status !== 'error' && (
        <>
          <MoviesList genres={genres} movies={trendingMovies} link="movies/" />
          <PagePagination
            totalResults={totalResults}
            currentPage={page}
            setPage={setSearchParams}
          />
        </>
      )}

      {status === 'error' && <NotFound />}

      {status === 'loading' && <Spinner />}
    </main>
  );
};

export default Home;
