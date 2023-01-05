import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Notiflix from 'notiflix';

import {
  MoviesList,
  PagePagination,
  SearchField,
  NotFound,
  Spinner,
} from 'components';

import { movieApi } from 'services/api';

const Movies = ({ genres }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState('');
  const [status, setStatus] = useState('success');

  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setQueryInput(query);

    if (query) {
      setStatus('pending');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      movieApi
        .searchMovie(query, page)
        .then(({ results, total_results }) => {
          setMoviesList(results);
          setTotalResults(total_results);
          setStatus('success');
        })
        .catch(() => setStatus('error'));
    }

    if (query === '') {
      setMoviesList([]);
      setTotalResults(0);
    }
  }, [query, page, setStatus]);

  const handleFormSubmit = e => {
    e.preventDefault();

    const { value } = e.target.query;

    if (value === '') {
      Notiflix.Notify.failure('Search field is empty!!!');
      return;
    }

    setSearchParams({ query: value, page: 1 });
  };

  const setQueryString = page => setSearchParams({ query: query, ...page });

  return (
    <main>
      <SearchField
        handleFormSubmit={handleFormSubmit}
        setQueryInput={setQueryInput}
        queryInput={queryInput}
      />
      {(status === 'success' || status === 'pending') && (
        <MoviesList movies={moviesList} genres={genres} />
      )}
      {status === 'error' && (
        <NotFound
          title={`Oops! We couldn't find any movie with title - ${query}...`}
        />
      )}
      {status === 'pending' && <Spinner />}
      {status === 'success' && totalResults > 20 && (
        <PagePagination
          totalResults={totalResults}
          currentPage={page}
          setPage={setQueryString}
        />
      )}
    </main>
  );
};

export default Movies;
