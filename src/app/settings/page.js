'use client';
import { useState } from 'react';
import SettingsSidebar from '@/components/SettingsSidebar';

const sectionTitles = {
  profile: 'Profile Settings',
  notifications: 'Notification Settings',
  appearance: 'Appearance Settings',
  tasks: 'Task Settings',
  calendar: 'Calendar Settings',
  privacy: 'Privacy Settings',
};

export default function SettingsPage() {
  const [section, setSection] = useState('profile');

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center w-full overflow-x-hidden px-2 py-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl">
        <div className="md:w-1/4 w-full">
          <SettingsSidebar current={section} onSectionChange={setSection} />
        </div>
        <div className="flex-1 w-full">
          <div className="bg-white rounded-xl shadow p-6 w-full min-h-[400px] flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-bold mb-4 w-full text-left">{sectionTitles[section]}</h2>
            {section === 'profile' && (
              <div className="flex flex-col items-center w-full mb-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-20 h-20 rounded-full mb-2 border-2 border-indigo-200" />
                <button className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded font-semibold text-sm mb-2">Change Photo</button>
              </div>
            )}
            <div className="w-full flex-1 flex items-center justify-center text-gray-400 text-lg font-semibold">
              Coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
