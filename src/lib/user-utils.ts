import { createClient } from '@/lib/supabase/server'
import type { User } from '@/types/database'


export async function getUserByIdentifier(identifier: string): Promise<User | null> {
  const supabase = await createClient()
  
  // First try to find by username
  const { data: profile, error: usernameError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', identifier)
    .single()
  
  // If not found by username and identifier looks like UUID, try by ID
  if ((!profile || usernameError) && isValidUUID(identifier)) {
    const { data: profileById } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', identifier)
      .single()
    
    return profileById || null
  }
  
  return profile || null
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

export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}