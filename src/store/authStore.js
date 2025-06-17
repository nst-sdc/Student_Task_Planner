import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchUser: async () => {
    set({ loading: true });
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      set({ error, user: null, session: null, loading: false });
    } else {
      const user = data.session?.user ?? null;
      let userData = null;
      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('auth_uid', user.id)
          .single();
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
        } else {
          userData = profileData;
        }
      }
      set({ user: { ...user, profile: userData }, session: data.session ?? null, loading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  subscribeAuthChanges: () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        let userData = null;
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('auth_uid', session.user.id)
          .single();
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
        } else {
          userData = profileData;
        }
        set({ user: { ...session.user, profile: userData }, session, loading: false });
      } else {
        set({ user: null, session, loading: false });
      }
    });
  },

  upsertUserProfile: async (userId, fullName) => {
    console.log('Calling API to upsert user profile:', { userId, fullName });
    try {
      const response = await fetch('/api/upsertUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, fullName }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.error('API error upserting user profile:', result.error);
        return false;
      }
      console.log('API upsert user profile success:', result);
      return true;
    } catch (error) {
      console.error('Network error upserting user profile:', error);
      return false;
    }
  },
}));
