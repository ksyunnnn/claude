'use client'

import { useLanguageContext } from './language-context'

interface BodyWrapperProps {
  children: React.ReactNode
  className: string
}

export function BodyWrapper({ children, className }: BodyWrapperProps) {
  const { isLanguageSwitching } = useLanguageContext()
  
  const bodyClasses = [
    className,
    isLanguageSwitching && 'overflow-hidden switching-language'
  ].filter(Boolean).join(' ')

  return (
    <body className={bodyClasses}>
      {children}
    </body>
  )
}