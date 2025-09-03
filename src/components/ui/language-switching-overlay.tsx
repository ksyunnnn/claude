"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useCommonTranslations } from '@/lib/i18n/client'

interface LanguageSwitchingOverlayProps {
  isVisible: boolean
}

export function LanguageSwitchingOverlay({ 
  isVisible 
}: LanguageSwitchingOverlayProps) {
  const tCommon = useCommonTranslations()

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "language-switching-overlay", // Class for CSS selector
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-slate-900/80 backdrop-blur-lg",
        "animate-in fade-in-0 duration-300"
      )}
      style={{
        // Prevent any scrolling during language switch
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div className="flex flex-col items-center gap-6 text-center px-8">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-white/30 animate-ping" />
        </div>
        <div className="space-y-3">
          <p className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
            {tCommon('languageSwitching')}
          </p>
          <p className="text-base text-slate-200 max-w-xs drop-shadow-md">
            {tCommon('languageSwitchingDesc')}
          </p>
        </div>
      </div>
    </div>
  )
}