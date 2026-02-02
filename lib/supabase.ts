import { createClient } from '@supabase/supabase-js';

// Standard Vite environment variable access. 
// These will be replaced by Vite during build time.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fhymaqgrsksoobfepdzw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_xgbPc0lbG5F2onc00PDS-w_JeAAbqVJ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoeW1hcWdyc2tzb29iZmVwZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMTQ3MTUsImV4cCI6MjA4NTU5MDcxNX0.WoDfk9aparmjbEtJ_tCtSqEkyEHBxqk47ijs--rv0iM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath);

  return publicUrl;
};