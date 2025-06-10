import React from 'react';
import { UserIcon, BellIcon, EyeIcon, ClipboardDocumentListIcon, CalendarDaysIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const sections = [
  { label: 'Profile', icon: <UserIcon className="w-5 h-5" />, key: 'profile' },
  { label: 'Notifications', icon: <BellIcon className="w-5 h-5" />, key: 'notifications' },
  { label: 'Appearance', icon: <EyeIcon className="w-5 h-5" />, key: 'appearance' },
  { label: 'Tasks', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, key: 'tasks' },
  { label: 'Calendar', icon: <CalendarDaysIcon className="w-5 h-5" />, key: 'calendar' },
  { label: 'Privacy', icon: <ShieldCheckIcon className="w-5 h-5" />, key: 'privacy' },
];

export default function SettingsSidebar({ current, onSectionChange }) {
  return (
    <nav className="flex flex-row md:flex-col gap-2 md:gap-1 w-full md:w-48 bg-white md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none shadow md:shadow-none">
      {sections.map((section) => (
        <button
          key={section.key}
          onClick={() => onSectionChange(section.key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full text-left ${current === section.key ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {section.icon}
          {section.label}
        </button>
      ))}
    </nav>
  );
} 