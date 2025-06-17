'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
      setSession(data.session);
      // Upsert user profile in the users table
      const fullName = data.user.user_metadata?.full_name || '';
      const success = await useAuthStore.getState().upsertUserProfile(data.user.id, fullName);
      if (!success) {
        setError('Failed to save user profile.');
      }
      setLoggedIn(true);
      // Wait for profile upsert before redirecting
      if (success) {
        router.push('/');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Log In</h1>
        {loggedIn ? (
          <div className="text-green-600 text-center">Login successful! Redirecting...</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="border rounded px-3 py-2" />
            <input name="password" value={form.password} onChange={handleChange} required type="password" placeholder="Password" className="border rounded px-3 py-2" />
            {error && <div className="text-red-600 text-center">{error}</div>}
            <button type="submit" className="bg-primary-600 text-white py-2 rounded font-semibold hover:bg-primary-700">Log In</button>
          </form>
        )}
      </div>
    </div>
  );
}
