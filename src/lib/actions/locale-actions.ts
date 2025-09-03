'use server'

import { createClient } from '@/lib/supabase/server'
import { Locale } from '@/i18n'

export async function updateUserLocale(locale: Locale) {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('User not authenticated')
  }

  // Update user metadata with preferred locale
  const { error: updateError } = await supabase.auth.updateUser({
    data: { 
      preferred_locale: locale 
    }
  })

  if (updateError) {
    throw new Error('Failed to update user locale preference')
  }

  return { success: true }
}

export async function getUserLocale(): Promise<Locale> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user?.user_metadata?.preferred_locale) {
    const preferredLocale = user.user_metadata.preferred_locale
    // locales配列に含まれる値のみを返すことで型安全性を保証
    if (preferredLocale === 'ja' || preferredLocale === 'en') {
      return preferredLocale
    }
  }
  
  return 'ja' // Default locale
}