import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './SearchField.module.css';

import { IconContext } from 'react-icons';
import { FcSearch } from 'react-icons/fc';
import { useEffect } from 'react';

export const SearchField = () => {
  const [queryInput, setQueryInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  const handleChangeInput = ({ target }) => {
    setQueryInput(target.value);
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
    <form className={css.searchForm} onSubmit={handleFormSubmit}>
      <input
        className={css.searchField}
        onChange={handleChangeInput}
        value={queryInput}
        name="query"
        type="text"
        autoComplete="off"
      />
      <button className={css.searchBtn} type="submit">
        <IconContext.Provider value={{ size: '20px' }}>
          <FcSearch />
        </IconContext.Provider>
      </button>
    </form>
  );
};
