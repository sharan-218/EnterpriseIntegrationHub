import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

/**
 * Supabase Admin Client — full access, used server-side.
 */
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Supabase Public Client — limited access, used for general server tasks.
 */
export const supabasePublic = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
