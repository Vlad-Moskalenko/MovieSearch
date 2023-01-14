import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Notiflix from 'notiflix';

import {
  MoviesList,
  PagePagination,
  SearchField,
  NotFound,
  Spinner,
} from 'components';
import { selectSearchMovies } from 'redux/selectors';
import { getSearchMovie } from 'redux/operations';

const Movies = ({ genres }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const [queryInput, setQueryInput] = useState('');

  const { searchMovies, isLoading, error, totalResults } =
    useSelector(selectSearchMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    setQueryInput(query);

    if (query) {
      dispatch(getSearchMovie({ query, page }));
    }
  }, [query, page, dispatch]);

  const handleFormSubmit = e => {
    e.preventDefault();

    const query = e.target.query.value.toLowerCase().trim();

    if (query === '') {
      Notiflix.Notify.failure('Search field is empty!!!');
      return;
    }

    setSearchParams({ query: query, page: 1 });
  };

  const setQueryString = page => setSearchParams({ query: query, ...page });

  return (
    <main>
      <SearchField
        handleFormSubmit={handleFormSubmit}
        setQueryInput={setQueryInput}
        queryInput={queryInput}
      />
      {(!error || isLoading) && (
        <>
          <MoviesList movies={searchMovies} genres={genres} />
          {totalResults > 20 && (
            <PagePagination
              totalResults={totalResults}
              currentPage={page}
              setPage={setQueryString}
            />
          )}
        </>
      )}

      {isLoading && <Spinner />}

      {error && (
        <NotFound
          title={`Oops! We couldn't find any movie with title - ${query}...`}
        />
      )}
    </main>
  );
};

export default Movies;
