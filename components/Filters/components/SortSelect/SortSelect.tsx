import React, { useMemo }from 'react';
import { useAppContext } from '../../../../context/AppContext';
import './SortSelect.css';

export const SortSelect = () => {
  const { handleFilterChange } = useAppContext();
  const options = useMemo(() => [
    {value: '', option: 'Select an option'}, 
    {value: 'first', option: 'Name'}, 
    {value: 'last', option: 'Lastname'}, 
    {value: 'email', option: 'Email'},
    {value: 'phone', option: 'Phone'}, 
    {value: 'state', option: 'State'}, 
    {value: 'city', option: 'City'}
  ])
  
  return (
    <div className="sort-select-container">
      <span className="sort-select-label">Sort by:</span>
      <select className="sort-select" onChange={(e) => handleFilterChange('', e.target.value, 'sort')}>
        {options.map(option =>  <option key={option.value} value={option.value}>{option.option}</option>)}
      </select>
    </div>
  )
}