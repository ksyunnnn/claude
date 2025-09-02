'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserById } from '@/lib/user-utils'
import type { FollowerWithProfile, FollowingWithProfile } from '@/types/supabase'

export async function followUser(followingId: string) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/auth/login')
  }

  // Check if already following
  const { data: existingFollow } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', user.id)
    .eq('following_id', followingId)
    .single()

  if (existingFollow) {
    return { success: false, error: 'Already following this user' }
  }

  // Create follow relationship
  const { error } = await supabase
    .from('follows')
    .insert({
      follower_id: user.id,
      following_id: followingId,
    })

  if (error) {
    console.error('Error following user:', error)
    return { success: false, error: 'Failed to follow user' }
  }

  // Get usernames for revalidation
  const followingUser = await getUserById(followingId)
  const currentUser = await getUserById(user.id)

  // Revalidate relevant pages (username-based)
  if (followingUser?.username) {
    revalidatePath(`/${followingUser.username}`)
    revalidatePath(`/${followingUser.username}/followers`)
  }
  if (currentUser?.username) {
    revalidatePath(`/${currentUser.username}/following`)
  }
  
  // Also revalidate ID-based paths for compatibility
  revalidatePath(`/${followingId}`)
  revalidatePath(`/${user.id}/following`)
  revalidatePath(`/${followingId}/followers`)

  return { success: true }
}

export async function unfollowUser(followingId: string) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/auth/login')
  }

  // Delete follow relationship
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', user.id)
    .eq('following_id', followingId)

  if (error) {
    console.error('Error unfollowing user:', error)
    return { success: false, error: 'Failed to unfollow user' }
  }

  // Get usernames for revalidation
  const followingUser = await getUserById(followingId)
  const currentUser = await getUserById(user.id)

  // Revalidate relevant pages (username-based)
  if (followingUser?.username) {
    revalidatePath(`/${followingUser.username}`)
    revalidatePath(`/${followingUser.username}/followers`)
  }
  if (currentUser?.username) {
    revalidatePath(`/${currentUser.username}/following`)
  }
  
  // Also revalidate ID-based paths for compatibility
  revalidatePath(`/${followingId}`)
  revalidatePath(`/${user.id}/following`)
  revalidatePath(`/${followingId}/followers`)

  return { success: true }
}

export async function getFollowStatus(followingId: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', user.id)
    .eq('following_id', followingId)
    .single()

  return !!data
}

export async function getFollowCounts(userId: string) {
  const supabase = await createClient()

  // Get follower count
  const { count: followerCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact' })
    .eq('following_id', userId)

  // Get following count
  const { count: followingCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact' })
    .eq('follower_id', userId)

  return {
    followers: followerCount || 0,
    following: followingCount || 0
  }
}

export async function getFollowers(userId: string): Promise<FollowerWithProfile[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('follows')
    .select(`
      follower_id,
      created_at,
      profiles!follows_follower_id_fkey (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('following_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching followers:', error)
    return []
  }

  return data || []
}

export async function getFollowing(userId: string): Promise<FollowingWithProfile[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('follows')
    .select(`
      following_id,
      created_at,
      profiles!follows_following_id_fkey (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('follower_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching following:', error)
    return []
  }

  return data || []
}