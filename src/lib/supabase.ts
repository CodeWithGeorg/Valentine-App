import { createClient } from '@supabase/supabase-js';

// Environment variables should be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client-side check function
const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && 
         supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Only create client if environment variables are available
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  
  return supabaseInstance;
};

// Export the client getter (returns null if not configured)
export const supabase = getSupabaseClient();

// Helper function to normalize names (lowercase, trim whitespace, replace spaces with dashes)
export function normalizeName(inputName: string): string {
  return inputName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')  // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '')  // Remove special characters except dashes
    .replace(/-+/g, '-')  // Replace multiple dashes with single dash
    .replace(/^-|-$/g, '');  // Remove leading/trailing dashes
}

// Database helper functions - now using normalized name as the unique identifier

export async function createValentinePage(name: string, message: string, theme: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  // Normalize the name for the URL
  const normalizedName = normalizeName(name);
  
  // Also keep the original name for display
  const displayName = name.trim();

  const { data, error } = await (client as any)
    .from('pages')
    .upsert([{ 
      name: displayName, 
      name_slug: normalizedName,
      message, 
      theme 
    }], { onConflict: 'name_slug' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getValentinePageByName(name: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  // Try to find by slug first, then by exact name match
  const normalizedName = normalizeName(name);
  
  // First try exact slug match
  let { data, error } = await (client as any)
    .from('pages')
    .select('*')
    .eq('name_slug', normalizedName)
    .single();

  // If not found, try case-insensitive search
  if (error || !data) {
    const result = await (client as any)
      .from('pages')
      .select('*')
      .ilike('name_slug', normalizedName)
      .single();
    data = result.data;
    error = result.error;
  }

  if (error) throw error;
  return data;
}

export async function getMessagesByPageName(pageName: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  const normalizedName = normalizeName(pageName);
  
  const { data, error } = await (client as any)
    .from('messages')
    .select('*')
    .eq('page_name_slug', normalizedName)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createAnonymousMessage(pageName: string, content: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  const normalizedName = normalizeName(pageName);

  const { data, error } = await (client as any)
    .from('messages')
    .insert([{ page_name_slug: normalizedName, content }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMessage(messageId: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  const { error } = await (client as any)
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) throw error;
}

export async function deletePage(pageName: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  const normalizedName = normalizeName(pageName);
  
  const { error } = await (client as any)
    .from('pages')
    .delete()
    .eq('name_slug', normalizedName);

  if (error) throw error;
}

// Export configuration check function
export { isSupabaseConfigured };
