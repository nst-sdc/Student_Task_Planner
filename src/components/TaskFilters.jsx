import React from 'react';

const FILTERS = ['All', 'Pending', 'Completed', 'Overdue'];

export default function TaskFilters({ current, onChange, verticalOnMobile }) {
  return (
    <div className={`flex ${verticalOnMobile ? 'flex-col sm:flex-row' : 'flex-row'} gap-2 w-full`}>
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-1 rounded-full font-semibold w-full sm:w-auto ${current === filter ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
} 