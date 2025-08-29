'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { isValidUsername } from '@/lib/user-utils'

export async function updateUsername(username: string) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/auth/login')
  }

  // Validate username format
  if (!isValidUsername(username)) {
    return { 
      success: false, 
      error: 'Username must be 3-20 characters, letters/numbers/underscore/hyphen only, and start with letter or number' 
    }
  }

  // Check if username is already taken
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .neq('id', user.id)
    .single()

  if (existingUser) {
    return { success: false, error: 'Username is already taken' }
  }

  // Update username
  const { error } = await supabase
    .from('profiles')
    .update({ username })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating username:', error)
    return { success: false, error: 'Failed to update username' }
  }

  // Revalidate relevant pages
  revalidatePath('/settings')
  revalidatePath(`/${username}`)

  return { success: true }
}

export async function updateProfile(fullName: string) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/auth/login')
  }

  // Update full name
  const { error } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: 'Failed to update profile' }
  }

  // Revalidate relevant pages
  revalidatePath('/settings')

  return { success: true }
}