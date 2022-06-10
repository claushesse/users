import React from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SortSelect } from './components/SortSelect/SortSelect';
import './Filters.css';

// the filter header where the searchbar and sort select where displayed
export const Filters = () => {
  return (
    <div className="filters-container">
      <SearchBar />
      <SortSelect />
    </div>
  )
}