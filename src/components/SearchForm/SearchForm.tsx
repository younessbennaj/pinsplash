import React from 'react';
import { useNavigate } from 'react-router';
import SearchBar from '../SearchBar/SearchBar';

function SearchForm() {
  const [query, setQuery] = React.useState('');

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Form submitted');
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
