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

  const loadUserData = useCallback(async (userId: string | undefined, currentUser?: User | null) => {
    if (!supabase || !userId) {
      setProfile(null);
      setEnrollment(null);
      return;
    }
    try {
      const [{ data: p, error: pErr }, { data: e }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('enrollments').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).maybeSingle()
      ]);

      const userEmail = (currentUser?.email || p?.email || '').toLowerCase();
      let resolvedRole: 'student' | 'admin' = (p?.role as 'student' | 'admin') || 'student';

      if (resolvedRole !== 'admin') {
        if (userEmail === 'okikeenterprises@gmail.com') {
          resolvedRole = 'admin';
        } else {
          const { data: adminRow } = await supabase
            .from('admins')
            .select('email')
            .eq('email', userEmail)
            .maybeSingle();
          if (adminRow) resolvedRole = 'admin';
        }
      }

      if (p) {
        setProfile({ ...(p as DbProfile), role: resolvedRole });
      } else {
        // Fallback profile from user auth metadata so the app doesn't stall
        const email = currentUser?.email || '';
        const meta = currentUser?.user_metadata || {};
        const fallback: DbProfile = {
          id: userId,
          full_name: meta.full_name || email.split('@')[0] || 'Learner',
          email,
          phone: meta.phone || null,
          country: meta.country || 'Nigeria',
          role: resolvedRole,
          created_at: new Date().toISOString()
        };

        // If the table exists, self-heal by upserting
        if (!pErr) {
          try {
            await supabase.from('profiles').upsert(fallback);
          } catch {
            // silent catch
          }
        }
        setProfile(fallback);
      }

      setEnrollment((e as DbEnrollment) ?? null);
    } catch (err) {
      console.warn('Error loading user data:', err);
      if (currentUser) {
        const email = currentUser.email || '';
        setProfile({
          id: userId,
          full_name: currentUser.email?.split('@')[0] || 'Learner',
          email,
          phone: null,
          country: 'Nigeria',
          role: (email.toLowerCase() === 'okikeenterprises@gmail.com' ? 'admin' : 'student') as 'student' | 'admin',
          created_at: new Date().toISOString()
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      await loadUserData(data.session?.user.id, data.session?.user);
      if (active) setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setTimeout(() => { loadUserData(next?.user.id, next?.user); }, 0);
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

    // Fallback: If user was returned, also directly ensure profile and enrollment are inserted
    if (data.user) {
      try {
        await Promise.allSettled([
          supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: input.fullName,
            email: input.email,
            phone: input.phone,
            country: input.country,
            role: 'student'
          }),
          supabase.from('enrollments').upsert({
            user_id: data.user.id,
            track_id: input.trackId,
            payment_plan: input.paymentPlan,
            cohort: 'Cohort 1 (Alpha)',
            payment_status: 'pending',
            amount_paid: 0,
            telegram_joined: false,
            status: 'active'
          })
        ]);
      } catch (insertErr) {
        console.warn('Direct enrollment insert notice:', insertErr);
      }
    }

    return { needsConfirmation: !data.session };
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setEnrollment(null);
  };

  const refresh = async () => loadUserData(session?.user.id, session?.user);

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
