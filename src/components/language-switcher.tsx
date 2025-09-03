'use client'

import { useState, useTransition, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n'
import { Button } from '@/components/ui/button'
import { LanguageSwitchingOverlay } from '@/components/ui/language-switching-overlay'
import { updateUserLocale } from '@/lib/actions/locale-actions'
import { useLocale } from '@/lib/i18n/client'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isUpdating, setIsUpdating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  // Handle component unmount cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // Always clean up DOM state on unmount
      document.body.style.overflow = ''
      document.body.classList.remove('switching-language')
    }
  }, [])

  // Handle body scroll and class changes
  useEffect(() => {
    if (isUpdating) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('switching-language')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('switching-language')
    }
  }, [isUpdating])

  const handleLocaleChange = useCallback((newLocale: Locale) => {
    // Prevent multiple concurrent locale changes
    if (newLocale === locale || isUpdating) return
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setIsUpdating(true)
    
    startTransition(async () => {
      try {
        await updateUserLocale(newLocale)
        
        // Update html lang attribute for immediate CSS changes
        document.documentElement.lang = newLocale
        
        // Use router refresh instead of page reload for smoother transition
        router.refresh()
        
        // Keep overlay visible for smooth transition completion
        timeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setIsUpdating(false)
          }
        }, 800)
      } catch (error) {
        console.error('Failed to update locale:', error)
        if (mountedRef.current) {
          setIsUpdating(false)
        }
      }
    })
  }, [locale, isUpdating, router])

  const isLoading = isPending || isUpdating

  return (
    <>
      <div className="flex items-center space-x-1">
        <Button
          variant={locale === 'ja' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLocaleChange('ja')}
          disabled={isLoading}
          className="transition-all duration-200 ease-in-out hover:scale-105"
        >
          日本語
        </Button>
        <span className="text-muted-foreground transition-opacity duration-200">|</span>
        <Button
          variant={locale === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLocaleChange('en')}
          disabled={isLoading}
          className="transition-all duration-200 ease-in-out hover:scale-105"
        >
          English
        </Button>
      </div>
      
      {/* Full-screen loading overlay during language switch */}
      <LanguageSwitchingOverlay 
        isVisible={isUpdating}
        locale={locale}
      />
    </>
  )
}