
import { createClient } from '@supabase/supabase-js';

/**
 * LƯU Ý: Phải sử dụng đúng cú pháp import.meta.env.VITE_... (không ép kiểu)
 * để Vite có thể thay thế giá trị tĩnh trong quá trình build/deploy.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fhymaqgrsksoobfepdzw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_xgbPc0lbG5F2onc00PDS-w_JeAAbqVJ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoeW1hcWdyc2tzb29iZmVwZHp3Iiwic