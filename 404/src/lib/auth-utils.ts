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

/**
 * Get current user ID if authenticated
 * @returns Promise<string | null> - user ID or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return !error && user ? user.id : null
  } catch {
    return null
  }
}

/**
 * Get current user if authenticated
 * @returns Promise<User | null> - user object or null if not authenticated
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return !error && user ? user : null
  } catch {
    return null
  }
}