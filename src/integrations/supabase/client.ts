import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Export types for TypeScript (optional - can be configured later)
// export type { Database } from './types';

// Helper functions for common operations
export const supabaseHelpers = {
  // Check if client is properly configured
  isConfigured: () => {
    return supabaseUrl !== 'https://placeholder.supabase.co' && 
           supabaseKey !== 'placeholder-key';
  },

  // Safe query wrapper that handles errors
  safeQuery: async <T>(queryFn: () => Promise<{ data: T | null; error: any }>) => {
    try {
      if (!supabaseHelpers.isConfigured()) {
        console.warn('Supabase not configured - using mock data');
        return { data: null, error: null };
      }
      return await queryFn();
    } catch (error) {
      console.error('Supabase query error:', error);
      return { data: null, error };
    }
  }
};
