import { createClient } from '@/lib/supabase/server'
import type { User } from '@/types/database'

export async function getUserByUsername(username: string): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !profile) {
    return null
  }

  return profile
}

export async function getUserById(userId: string): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return null
  }

  return profile
}

export function isValidUsername(username: string): boolean {
  // Username validation rules:
  // - 3-20 characters
  // - Only letters, numbers, underscores, hyphens
  // - Must start with letter or number
  const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,19}$/
  return usernameRegex.test(username)
}