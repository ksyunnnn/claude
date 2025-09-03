'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LanguageContextType {
  isLanguageSwitching: boolean
  setIsLanguageSwitching: (value: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false)

  return (
    <LanguageContext.Provider value={{ isLanguageSwitching, setIsLanguageSwitching }}>
      {children}
    </LanguageContext.Provider>
  )
}