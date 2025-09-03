"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Loader2 } from "lucide-react"

interface LanguageSwitchingOverlayProps {
  isVisible: boolean
  locale?: 'ja' | 'en'
}

export function LanguageSwitchingOverlay({ 
  isVisible,
  locale = 'ja'
}: LanguageSwitchingOverlayProps) {
  const [mounted, setMounted] = React.useState(false)
  
  // Static text that doesn't depend on language switching system
  const text = {
    ja: {
      switching: "言語切り替え中...",
      description: "しばらくお待ちください"
    },
    en: {
      switching: "Switching language...",
      description: "Please wait a moment"
    }
  }

  // Ensure component only renders on client
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Debug logging
  React.useEffect(() => {
    console.log('LanguageSwitchingOverlay render:', { isVisible, mounted })
    if (isVisible) {
      console.log('Overlay should be visible now')
    }
  }, [isVisible, mounted])

  // Don't render on server or when not mounted
  if (!mounted || !isVisible) return null

  const overlayContent = (
    <div
      className="language-switching-overlay"
      style={{
        // Use inline styles for maximum compatibility
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900/90
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        textAlign: 'center',
        padding: '0 32px'
      }}>
        <div style={{ position: 'relative' }}>
          <Loader2 
            className="h-12 w-12 animate-spin" 
            style={{ color: 'white' }}
          />
          <div 
            className="absolute inset-0 animate-ping"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '0.025em',
            textShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            margin: 0
          }}>
            {text[locale].switching}
          </p>
          <p style={{
            fontSize: '16px',
            color: '#e2e8f0', // slate-200
            maxWidth: '192px',
            textShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            margin: 0
          }}>
            {text[locale].description}
          </p>
        </div>
      </div>
    </div>
  )

  // Use portal to render at document root level
  return createPortal(overlayContent, document.body)
}