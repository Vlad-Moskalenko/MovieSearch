import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MoviesList } from 'components';

import { movieApi } from 'services/api';

export const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [queryInput, setQueryInput] = useState(query);

  useEffect(() => {
    if (query) {
      movieApi.searchMovie(query).then(({ results }) => setMoviesList(results));
    }
    if (query === '') {
      setMoviesList([]);
    }
  }, [query]);

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
    </div>
  );
};
