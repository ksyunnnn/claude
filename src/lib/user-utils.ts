import { createClient } from '@/lib/supabase/server'

export async function getUserByUsername(username: string) {
  const supabase = await createClient()
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile, error } = await (supabase as any)
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !profile) {
    return null
  }

  return profile
}

export async function getUserById(userId: string) {
  const supabase = await createClient()
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile, error } = await (supabase as any)
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