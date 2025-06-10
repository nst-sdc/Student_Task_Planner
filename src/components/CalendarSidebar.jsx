import React from 'react';
import { CalendarDaysIcon, ClipboardDocumentListIcon, FolderIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Calendar', icon: <CalendarDaysIcon className="w-5 h-5" />, key: 'calendar' },
  { label: 'My Tasks', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, key: 'tasks' },
  { label: 'Projects', icon: <FolderIcon className="w-5 h-5" />, key: 'projects' },
  { label: 'Analytics', icon: <ChartBarIcon className="w-5 h-5" />, key: 'analytics' },
];

export default function CalendarSidebar({ current, onSectionChange }) {
  return (
    <aside className="flex flex-col justify-between h-full w-full md:w-56 bg-white border-r">
      <div>
        <div className="px-6 py-6 font-bold text-xl text-indigo-700">TaskPlanner</div>
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onSectionChange(item.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full text-left ${current === item.key ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 px-4 py-4 border-t">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-indigo-200" />
        <div>
          <div className="font-semibold text-gray-800 text-sm">Sarah Wilson</div>
          <div className="text-xs text-gray-500">Premium Plan</div>
        </div>
      </div>
    </aside>
  );
} 