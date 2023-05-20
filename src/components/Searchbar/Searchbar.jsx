import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      toast.error('Введіть значення пошуку');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
    event.target.reset();
  };

  const handleTextChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          value={searchName}
          onChange={handleTextChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
