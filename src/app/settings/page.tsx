import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from './profile-form'
import { LogoutButton } from '@/components/auth/logout-button'
import { Navigation } from '@/components/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'
import { getSettingsTranslations } from '@/lib/i18n/server'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const t = await getSettingsTranslations()

  if (!user) {
    redirect('/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-responsive">{t('title')}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-responsive">{t('profile')}</h2>
            <ProfileForm profile={profile} />
          </section>

          <section className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4 text-responsive">{t('language')}</h2>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="text-responsive">
                <p className="font-medium">{t('languagePreference')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('languageDescription')}
                </p>
              </div>
              <LanguageSwitcher />
            </div>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4 text-responsive">{t('account')}</h2>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="text-responsive">
                <p className="font-medium">{t('signOutAction')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('signOutDescription')}
                </p>
              </div>
              <LogoutButton />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}