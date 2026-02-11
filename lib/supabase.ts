
import { createClient } from '@supabase/supabase-js';

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

/**
 * Chuyển đổi File sang Base64 để sử dụng như một phương án dự phòng 
 * khi Supabase Storage chưa được cấu hình.
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadFile = async (file: File) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Thử tải lên Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.warn("Supabase Storage error, falling back to Base64:", uploadError);
      return await fileToBase64(file);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (err) {
    console.error("Upload failed, using Base64 fallback:", err);
    // Nếu lỗi kết nối (Failed to fetch), trả về Base64 để người dùng vẫn làm việc được
    return await fileToBase64(file);
  }
};
