'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuthTranslations } from '@/lib/i18n/client'

export function LogoutButton() {
  const router = useRouter()
  const t = useAuthTranslations()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <Button onClick={handleLogout} variant="ghost" className="btn-responsive text-responsive">
      {t('signOut')}
    </Button>
  )
}