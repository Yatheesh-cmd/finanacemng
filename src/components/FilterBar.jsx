import React, { useState } from 'react';

function FilterBar({ setFilters }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const handleFilter = () => {
    const newFilters = {};
    if (startDate) newFilters.startDate = startDate;
    if (endDate) newFilters.endDate = endDate;
    if (category) newFilters.category = category;
    console.log('Applying filters:', { startDate, endDate, category, newFilters });
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          console.log('Start date changed:', e.target.value);
        }}
        className="w-full rounded-lg"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
          console.log('End date changed:', e.target.value);
        }}
        className="w-full rounded-lg"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          console.log('Category changed:', e.target.value);
        }}
        className="w-full rounded-lg"
      />
      <button
        onClick={handleFilter}
        className="btn-hover-effect bg-indigo-600 text-white px-4 py-3 rounded-lg"
      >
        Filter
      </button>
    </div>
  );
}

export default FilterBar;