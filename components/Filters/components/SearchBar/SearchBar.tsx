import React from 'react';
import { useAppContext } from '../../../../context/AppContext';
import './SearchBar.css';

export const SearchBar = () => {
  const { handleFilterChange } = useAppContext();
  
  return (
    <div className="search-bar">
      <span className="search-label">Search</span>
      <input className="search-input" onChange={(e) => handleFilterChange(e.target.value, undefined, 'search')}/>
    </div>
  )
}