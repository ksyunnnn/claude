import { createClient } from '@/lib/supabase/server'
import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { Code2, Plus, Github } from 'lucide-react'
import Link from 'next/link'
import { getNavTranslations } from '@/lib/i18n/server'

export async function Navigation() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const t = await getNavTranslations()

  // Get user profile to get username
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Code2 className="h-6 w-6" />
          {t('logo')}
        </Link>
        <nav className="flex items-center gap-4 text-responsive">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="btn-responsive">
                <Link href="/new" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {t('newCommand')}
                </Link>
              </Button>
              {profile?.username && (
                <Button asChild variant="ghost" size="sm" className="btn-responsive">
                  <Link href={`/${profile.username}`}>
                    {t('myCommands')}
                  </Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="sm" className="btn-responsive">
                <Link href="/settings">
                  {t('settings')}
                </Link>
              </Button>
            </>
          ) : (
            <LoginButton />
          )}
          <Button asChild variant="ghost" size="sm" aria-label={t('githubRepository')}>
            <Link href="https://github.com/ksyunnnn/slash-commands" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}