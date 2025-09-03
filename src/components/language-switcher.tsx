'use client'

import { useTransition, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n'
import { Button } from '@/components/ui/button'
import { updateUserLocale } from '@/lib/actions/locale-actions'
import { useLocale } from '@/lib/i18n/client'
import { useLanguageContext } from './language-context'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { isLanguageSwitching, setIsLanguageSwitching } = useLanguageContext()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  // Handle component unmount cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleLocaleChange = useCallback((newLocale: Locale) => {
    // Prevent multiple concurrent locale changes
    if (newLocale === locale || isLanguageSwitching) return
    
    console.log('🔄 Starting language switch:', { from: locale, to: newLocale })
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setIsLanguageSwitching(true)
    console.log('✅ Set isLanguageSwitching to true')
    
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
            setIsLanguageSwitching(false)
            console.log('✅ Language switching completed')
          }
        }, 800)
      } catch (error) {
        console.error('Failed to update locale:', error)
        if (mountedRef.current) {
          setIsLanguageSwitching(false)
        }
      }
    })
  }, [locale, isLanguageSwitching, setIsLanguageSwitching, router])

  const isLoading = isPending || isLanguageSwitching

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
      {isLanguageSwitching && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/90 backdrop-blur-md flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center px-8">
            <div className="relative">
              <div className="h-12 w-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
                {locale === 'ja' ? '言語切り替え中...' : 'Switching language...'}
              </p>
              <p className="text-base text-slate-200 max-w-48 drop-shadow-md">
                {locale === 'ja' ? 'しばらくお待ちください' : 'Please wait a moment'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}