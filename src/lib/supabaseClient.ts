import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
	// Vite env না থাকলে ডেভেলপমেন্টে সহায়ক বার্তা
	console.warn('[Supabase] VITE_SUPABASE_URL বা VITE_SUPABASE_ANON_KEY সেট করা নেই।');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');