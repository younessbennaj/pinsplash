import React from 'react';
import { useNavigate } from 'react-router';
import SearchBar from '../SearchBar/SearchBar';

function SearchForm({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/search/?q=' + query);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <SearchBar onChange={handleSearchChange} value={query} />
    </form>
  );
}

export default SearchForm;
