import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy so a missing env var doesn't crash the build at import time.
let cached: SupabaseClient<any, any, any> | null = null;

export function getSupabase(): SupabaseClient<any, any, any> {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are not set");
  }

  cached = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cached;
}
