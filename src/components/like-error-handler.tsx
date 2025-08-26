'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

interface LikeErrorHandlerProps {
  hasError: boolean
  errorMessage?: string
}

export function LikeErrorHandler({ hasError, errorMessage }: LikeErrorHandlerProps) {
  useEffect(() => {
    if (hasError) {
      // Show toast with delay after page load
      const timer = setTimeout(() => {
        toast.error(errorMessage || 'いいね機能が一時的に利用できません', {
          description: 'しばらくしてから再度お試しください',
          duration: 5000,
        })
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [hasError, errorMessage])

  return null
}