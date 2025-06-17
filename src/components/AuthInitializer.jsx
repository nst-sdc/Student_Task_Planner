'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export default function AuthInitializer() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const subscribeAuthChanges = useAuthStore((state) => state.subscribeAuthChanges);

  useEffect(() => {
    fetchUser();
    const authListener = subscribeAuthChanges();
    return () => {
      authListener?.unsubscribe();
    };
  }, [fetchUser, subscribeAuthChanges]);

  return null;
}
