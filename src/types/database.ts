import type { Tables } from '@/lib/supabase/database.types'

// Common database types
export type User = Tables<'profiles'>
export type Command = Tables<'commands'>
export type Follow = Tables<'follows'>
export type Like = Tables<'likes'>

// Extended types with relations
export type CommandWithUser = Command & {
  profiles: {
    username: string | null
    full_name: string | null
  }
}

