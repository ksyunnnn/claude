'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useActionsTranslations } from '@/lib/i18n/client'

interface CommandActionsProps {
  content: string
}

export function CommandActions({ content }: CommandActionsProps) {
  const [copied, setCopied] = useState(false)
  const tActions = useActionsTranslations()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-1"
    >
      <Copy className="h-3 w-3" />
      {copied ? tActions('copied') : tActions('copy')}
    </Button>
  )
}