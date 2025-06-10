import React from 'react';

export default function ProgressBar({ completed, total }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
      </div>
      <div className="text-xs text-gray-500">{completed} of {total} tasks completed</div>
    </div>
  );
} 