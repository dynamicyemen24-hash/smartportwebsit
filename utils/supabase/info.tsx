/* Prefer environment variables for production credentials.
	This file uses explicit Supabase URL and anon key values.
	Remove any fallback values before you deploy to production. */

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? ''
export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  (projectId ? `https://${projectId}.supabase.co` : '')

export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !publicAnonKey) {
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set your environment variables before deploying.'
  )
}
