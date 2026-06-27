// src/admin/lib/supabase.jsx
import { createClient } from '@supabase/supabase-js';

var supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
var supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

var supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
