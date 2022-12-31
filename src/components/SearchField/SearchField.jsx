import css from './SearchField.module.css';

export const SearchField = props => {
  const { handleFormSubmit, setQueryInput, queryInput } = props;

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        onChange={e => setQueryInput(e.target.value)}
        value={queryInput}
        name="query"
        type="text"
      />
      <button type="submit">Search</button>
    </form>
  );
};
