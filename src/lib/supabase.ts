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

// Database helper functions - now using name as the unique identifier

export async function createValentinePage(name: string, message: string, theme: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  const { data, error } = await (client as any)
    .from('pages')
    .upsert([{ name, message, theme }], { onConflict: 'name' })
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

  const { data, error } = await (client as any)
    .from('pages')
    .select('*')
    .eq('name', name)
    .single();

  if (error) throw error;
  return data;
}

export async function getMessagesByPageName(pageName: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  const { data, error } = await (client as any)
    .from('messages')
    .select('*')
    .eq('page_name', pageName)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createAnonymousMessage(pageName: string, content: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please add your environment variables.');
  }

  const { data, error } = await (client as any)
    .from('messages')
    .insert([{ page_name: pageName, content }])
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

  const { error } = await (client as any)
    .from('pages')
    .delete()
    .eq('name', pageName);

  if (error) throw error;
}

// Export configuration check function
export { isSupabaseConfigured };
