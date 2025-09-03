'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { useAuthTranslations } from '@/lib/i18n/client'

export function LoginButton() {
  const t = useAuthTranslations()
  
  const handleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <Button onClick={handleLogin} variant="outline" className="btn-responsive text-responsive">
      <Github className="mr-2 h-4 w-4" />
      {t('signInWithGitHub')}
    </Button>
  )
}