import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Notiflix from 'notiflix';

import { MoviesList, PagePagination, SearchField } from 'components';

import { movieApi } from 'services/api';

export const Movies = ({ genres }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState('');

  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setQueryInput(query);

    if (query) {
      movieApi
        .searchMovie(query, page)
        .then(({ results, total_results }) => {
          setMoviesList(results);
          setTotalResults(total_results);
        })
        .finally(() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        );
    }

    if (query === '') {
      setMoviesList([]);
      setTotalResults(0);
    }
  }, [query, page]);

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
      {moviesList.length > 0 && (
        <MoviesList movies={moviesList} genres={genres} />
      )}
      {totalResults > 20 && (
        <PagePagination
          totalResults={totalResults}
          currentPage={page}
          setPage={setQueryString}
        />
      )}
    </main>
  );
};
