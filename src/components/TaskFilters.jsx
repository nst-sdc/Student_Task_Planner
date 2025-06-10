import React from 'react';

const FILTERS = ['All', 'Pending', 'Completed', 'Overdue'];

export default function TaskFilters({ current, onChange }) {
  return (
    <div className="flex gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-1 rounded-full font-semibold ${current === filter ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
} 