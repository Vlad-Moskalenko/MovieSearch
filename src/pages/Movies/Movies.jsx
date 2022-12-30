import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MoviesList, PagePagination } from 'components';

import { movieApi } from 'services/api';

export const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState();

  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setQueryInput(query);

    if (query) {
      movieApi.searchMovie(query, page).then(({ results, total_results }) => {
        setMoviesList(results);
        setTotalResults(total_results);
      });
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
      alert('Search field is empty!!!');
      return;
    }

    setSearchParams({ query: value, page: 1 });
  };

  const setQueryString = page => {
    setSearchParams({ query: query, ...page });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={e => setQueryInput(e.target.value)}
          value={queryInput}
          name="query"
          type="text"
        />
        <button type="submit">Search</button>
      </form>
      <MoviesList movies={moviesList} />
      {totalResults > 20 && (
        <PagePagination
          totalResults={totalResults}
          currentPage={page}
          setPage={setQueryString}
        />
      )}
    </div>
  );
};
