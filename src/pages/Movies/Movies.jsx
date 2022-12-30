import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MoviesList, PagePagination } from 'components';

import { movieApi } from 'services/api';

export const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [queryInput, setQueryInput] = useState(query);

  useEffect(() => {
    if (query && page) {
      movieApi.searchMovie(query, page).then(({ results, total_results }) => {
        setMoviesList(results);
        setTotalResults(total_results);
      });
    }
    if (query === '') {
      setMoviesList([]);
    }
  }, [query, page]);

  const handleFormSubmit = e => {
    e.preventDefault();

    const { value } = e.target.query;

    const searchParams = value !== '' ? { query: value } : {};
    setSearchParams(searchParams);
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
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};
