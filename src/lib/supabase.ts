import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True once real keys have been pasted into .env */
export const isSupabaseConfigured = Boolean(url && anonKey && url.startsWith('http'));

/** `null` when keys are missing, so the public marketing site keeps working. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;
