import React from "react";

function Sidebar() {
  return (
    <div className="w-1/6 h-screen overflow-y-auto p-4 bg-slate-50">
      <ul className="space-y-2 mt-4 p-4">
        <li>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
        </li>
        <li>
          <a href="/tasks" className="text-gray-600 hover:text-gray-800">
            My Tasks
          </a>
        </li>
        <li>
          <a href="/calendar" className="text-gray-600 hover:text-gray-800">
            Calendar
          </a>
        </li>
        <li>
          <a href="/courses" className="text-gray-600 hover:text-gray-800">
            Courses
          </a>
        </li>
        <li>
          <a href="/settings" className="text-gray-600 hover:text-gray-800">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
