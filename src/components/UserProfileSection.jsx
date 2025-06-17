import React from 'react';
import { useAuthStore } from '../store/authStore';

export default function UserProfileSection() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div>
        <p>No user data available.</p>
      </div>
    );
  }

  const { profile } = user;
  const joinedDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A';

  return (
    <div className="user-profile-section p-4 border rounded-md bg-white shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {profile?.full_name || 'N/A'}</p>
      <p><strong>Email:</strong> {user.email || 'N/A'}</p>
      <p><strong>Joined From:</strong> {joinedDate}</p>
    </div>
  );
}
