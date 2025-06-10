import React from 'react';

export default function CalendarBar({ days, rangeLabel }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        {days.map(({ day, date, current }) => (
          <div key={day} className={`flex flex-col items-center px-3 py-2 rounded-lg w-14 ${current ? 'bg-indigo-100 text-indigo-600 font-bold' : 'text-gray-700'}`}>
            <span className="text-xs mb-1">{day}</span>
            <span className="text-lg">{date}</span>
          </div>
        ))}
      </div>
      <span className="text-gray-500 text-sm">{rangeLabel}</span>
    </div>
  );
} 