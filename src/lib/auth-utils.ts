import { createClient } from '@/lib/supabase/server'

/**
 * Check if user is authenticated on the server
 * @returns Promise<boolean> - true if user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return !error && !!user
  } catch {
    return false
  }
}

