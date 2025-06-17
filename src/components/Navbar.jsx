'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-primary-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">TaskPlanner</div>
      <div className="space-x-4">
        {!user && (
          <>
            <button
              onClick={() => router.push('/login')}
              className="bg-primary-800 hover:bg-primary-900 px-3 py-1 rounded"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="bg-primary-800 hover:bg-primary-900 px-3 py-1 rounded"
            >
              Sign Up
            </button>
          </>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-primary-800 hover:bg-primary-900 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
