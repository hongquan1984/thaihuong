
import { createClient } from '@supabase/supabase-js';

/**
 * Access environment variables safely. 
 * Vite will replace these strings during the build process.
 */
const getEnvVar = (key: string, defaultValue: string): string => {
  try {
    const env = (import.meta as any).env;
    return (env && env[key]) || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://fhymaqgrsksoobfepdzw.supabase.co');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoeW1hcWdyc2tzb29iZmVwZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMTQ3MTUsImV4cCI6MjA4NTU5MDcxNX0.WoDfk9aparmjbEtJ_tCtSqEkyEHBxqk47ijs--rv0iM');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadFile = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath);

  return publicUrl;
};
