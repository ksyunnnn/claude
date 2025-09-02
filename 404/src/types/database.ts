import type { Database, Tables } from '@/lib/supabase/database.types'

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

export type UserWithCounts = User & {
  follower_count?: number
  following_count?: number
  commands_count?: number
}

export type CommandWithDetails = Command & {
  profiles: {
    username: string | null
    full_name: string | null
  }
  like_count?: number
  has_liked?: boolean
}

// Insert types
export type CommandInsert = Database['public']['Tables']['commands']['Insert']
export type UserInsert = Database['public']['Tables']['profiles']['Insert']
export type FollowInsert = Database['public']['Tables']['follows']['Insert']
export type LikeInsert = Database['public']['Tables']['likes']['Insert']

// Update types
export type CommandUpdate = Database['public']['Tables']['commands']['Update']
export type UserUpdate = Database['public']['Tables']['profiles']['Update']

// Function types
export type DatabaseFunctions = Database['public']['Functions']