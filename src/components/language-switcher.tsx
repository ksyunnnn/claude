'use client'

import { useState, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n'
import { Button } from '@/components/ui/button'
import { updateUserLocale } from '@/lib/actions/locale-actions'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return
    
    setIsUpdating(true)
    startTransition(async () => {
      try {
        await updateUserLocale(newLocale)
        // Set cookie for immediate UI update
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
        // Use router.refresh() instead of window.location.reload() for better UX
        router.refresh()
        setIsUpdating(false)
      } catch (error) {
        console.error('Failed to update locale:', error)
        setIsUpdating(false)
      }
    })
  }

  const isLoading = isPending || isUpdating

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant={locale === 'ja' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleLocaleChange('ja')}
        disabled={isLoading}
        className="btn-responsive text-responsive"
      >
        日本語
      </Button>
      <span className="text-muted-foreground">|</span>
      <Button
        variant={locale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleLocaleChange('en')}
        disabled={isLoading}
        className="btn-responsive text-responsive"
      >
        English
      </Button>
    </div>
  )
}