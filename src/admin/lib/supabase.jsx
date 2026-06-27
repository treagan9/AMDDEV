// src/admin/lib/supabase.jsx
import { createClient } from '@supabase/supabase-js';

var supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
var supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

var supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
