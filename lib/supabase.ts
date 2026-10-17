/**
 * Supabase is scaffolded and intentionally unwired.
 * The running app reads lib/demo-data.ts and does not call this module.
 * When NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set,
 * create a browser client here and replace the stub session in the console.
 */
export function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return {
      configured: false as const,
      reason:
        "Supabase env vars are empty. The app is running on local demo seed data.",
    };
  }
  return { configured: true as const, url, anonKey };
}
