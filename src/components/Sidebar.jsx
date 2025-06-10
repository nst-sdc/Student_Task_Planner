'use client';
import React, { useState } from "react";
import { usePathname } from 'next/navigation';
import { HomeIcon, ClipboardDocumentListIcon, CalendarDaysIcon, BookOpenIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Overview', href: '/home', icon: <HomeIcon className="w-5 h-5" /> },
  { label: 'My Tasks', href: '/tasks', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
  { label: 'Calendar', href: '/calendar', icon: <CalendarDaysIcon className="w-5 h-5" /> },
  { label: 'Courses', href: '/courses', icon: <BookOpenIcon className="w-5 h-5" /> },
  { label: 'Settings', href: '/settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Hamburger Button - always visible */}
      <button
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="w-6 h-6 text-indigo-700" />
      </button>
      {/* Overlay for mobile and desktop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r flex flex-col justify-between min-h-screen transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <div className="flex items-center gap-2 px-6 py-6">
            <span className="text-indigo-700 text-2xl font-bold">TaskPlanner</span>
            {/* Close button (always visible when sidebar is open) */}
            {open && (
              <button
                className="ml-auto"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            )}
          </div>
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="px-6 py-4">
          <div className="mb-2 text-xs text-gray-500">Daily Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
            <div className="bg-indigo-600 h-1 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <div className="text-xs text-gray-500">1 of 5 tasks completed</div>
        </div>
      </aside>
    </>
  );
}
