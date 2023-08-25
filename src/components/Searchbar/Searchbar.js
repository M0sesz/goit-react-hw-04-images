import React, { useState } from 'react';
import {
  SearchbarWrapper,
  SearchForm,
  SearchInput,
  SearchButton,
} from './Seachbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <span>Search</span>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};

export default Searchbar;
