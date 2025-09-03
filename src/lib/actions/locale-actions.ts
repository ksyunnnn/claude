'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { Locale } from '@/i18n'

export async function updateUserLocale(locale: Locale) {
  // Set cookie first (this always works)
  const cookieStore = await cookies()
  cookieStore.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  // Try to update user metadata if authenticated (non-blocking)
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      await supabase.auth.updateUser({
        data: { 
          preferred_locale: locale 
        }
      })
    }
  } catch (error) {
    // Non-blocking: if user metadata update fails, cookie-based approach still works
    console.warn('Failed to update user metadata, using cookie-only approach:', error)
  }

  return { success: true }
}

