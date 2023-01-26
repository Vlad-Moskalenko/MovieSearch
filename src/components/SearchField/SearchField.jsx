import { useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import css from './SearchField.module.css';

import { IconContext } from 'react-icons';
import { FcSearch } from 'react-icons/fc';
import { useEffect } from 'react';
import { filterMovies } from 'redux/library/librarySlice';

export const SearchField = () => {
  const [queryInput, setQueryInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filter = useSelector(state => state.library.filter);
  const location = useLocation();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  const handleChangeInput = ({ target }) => {
    setQueryInput(target.value);
  };

  const handleFilter = ({ target }) => {
    dispatch(filterMovies(target.value));
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const query = e.target.query.value.toLowerCase().trim();

    if (query === '') {
      setSearchParams({});
    }

    setSearchParams({ query: query, page: 1 });
  };

  return (
    <>
      {location.pathname === '/' ? (
        <form className={css.searchForm} onSubmit={handleFormSubmit}>
          <input
            className={css.searchField}
            onChange={handleChangeInput}
            value={queryInput}
            name="query"
            type="text"
            autoComplete="off"
            placeholder="Search movie..."
          />
          <button className={css.searchBtn} type="submit">
            <IconContext.Provider value={{ size: '20px' }}>
              <FcSearch />
            </IconContext.Provider>
          </button>
        </form>
      ) : (
        <input
          className={css.searchField}
          onChange={handleFilter}
          value={filter}
          name="query"
          type="text"
          autoComplete="off"
          placeholder="Find your movie..."
        />
      )}
    </>
  );
};
