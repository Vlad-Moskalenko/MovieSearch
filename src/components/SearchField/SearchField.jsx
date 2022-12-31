import css from './SearchField.module.css';

import { IconContext } from 'react-icons';
import { FcSearch } from 'react-icons/fc';

export const SearchField = props => {
  const { handleFormSubmit, setQueryInput, queryInput } = props;

  return (
    <form className={css.searchForm} onSubmit={handleFormSubmit}>
      <input
        className={css.searchField}
        onChange={e => setQueryInput(e.target.value)}
        value={queryInput}
        name="query"
        type="text"
      />
      <button className={css.searchBtn} type="submit">
        <IconContext.Provider value={{ size: '20px' }}>
          <FcSearch />
        </IconContext.Provider>
      </button>
    </form>
  );
};
