import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { DbEnrollment, DbProfile } from '../types/db';

export interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  country: string;
  trackId: string;
  paymentPlan: 'upfront' | 'installment';
}

interface AuthState {
  configured: boolean;
  loading: boolean;
  user: User | null;
  profile: DbProfile | null;
  enrollment: DbEnrollment | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  /** Returns { error } or { needsConfirmation } when email verification is on. */
  signUp: (input: SignUpInput) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [enrollment, setEnrollment] = useState<DbEnrollment | null>(null);
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);

  const loadUserData = useCallback(async (userId: string | undefined) => {
    if (!supabase || !userId) {
      setProfile(null);
      setEnrollment(null);
      return;
    }
    const [{ data: p }, { data: e }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('enrollments').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).maybeSingle()
    ]);
    setProfile((p as DbProfile) ?? null);
    setEnrollment((e as DbEnrollment) ?? null);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      await loadUserData(data.session?.user.id);
      if (active) setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      // Defer to avoid deadlocking inside the auth callback
      setTimeout(() => { loadUserData(next?.user.id); }, 0);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadUserData]);

  const signIn: AuthState['signIn'] = async (email, password) => {
    if (!supabase) return 'Supabase is not configured yet. Add your keys to the .env file.';
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  };

  const signUp: AuthState['signUp'] = async (input) => {
    if (!supabase) return { error: 'Supabase is not configured yet. Add your keys to the .env file.' };
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          full_name: input.fullName,
          phone: input.phone,
          country: input.country,
          track_id: input.trackId,
          payment_plan: input.paymentPlan
        }
      }
    });
    if (error) return { error: error.message };
    return { needsConfirmation: !data.session };
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setEnrollment(null);
  };

  const refresh = async () => loadUserData(session?.user.id);

  return (
    <AuthContext.Provider
      value={{
        configured: isSupabaseConfigured,
        loading,
        user: session?.user ?? null,
        profile,
        enrollment,
        isAdmin: profile?.role === 'admin',
        signIn,
        signUp,
        signOut,
        refresh
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
