import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hwtsyaudekldmgvitoqd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3dHN5YXVkZWtsZG1ndml0b3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NDk3MDQsImV4cCI6MjA2OTAyNTcwNH0.vQtYpVpSl4vCfKD0LjAqVXFi1aHeo_vGji6Jw8ivLyQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});