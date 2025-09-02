'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { LikedUser } from '@/components/liked-users-modal'

export async function likeCommand(commandId: string) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, error: 'Authentication required', requiresAuth: true }
  }

  // Check if already liked
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('command_id', commandId)
    .single()

  if (existingLike) {
    return { success: false, error: 'Already liked this command' }
  }

  // Create like
  const { error } = await supabase
    .from('likes')
    .insert({
      user_id: user.id,
      command_id: commandId,
    })

  if (error) {
    console.error('Error liking command:', error)
    return { success: false, error: 'Failed to like command' }
  }

  // Revalidate command pages
  revalidatePath(`/`)
  revalidatePath(`/commands/${commandId}`)

  return { success: true }
}

export async function unlikeCommand(commandId: string) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, error: 'Authentication required', requiresAuth: true }
  }

  // Delete like
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', user.id)
    .eq('command_id', commandId)

  if (error) {
    console.error('Error unliking command:', error)
    return { success: false, error: 'Failed to unlike command' }
  }

  // Revalidate command pages
  revalidatePath(`/`)
  revalidatePath(`/commands/${commandId}`)

  return { success: true }
}

export async function getLikeStatus(commandId: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('command_id', commandId)
    .single()

  return !!data
}

export async function getLikeCount(commandId: string): Promise<number> {
  const supabase = await createClient()

  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('command_id', commandId)

  return count || 0
}

export async function getLikedUsers(commandId: string): Promise<LikedUser[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('likes')
    .select(`
      user_id,
      created_at,
      profiles!likes_user_id_fkey (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('command_id', commandId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching liked users:', error)
    return []
  }

  return data || []
}