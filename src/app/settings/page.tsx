import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from './profile-form'
import { LogoutButton } from '@/components/auth/logout-button'
import { Navigation } from '@/components/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <ProfileForm profile={profile} />
          </section>

          <section className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Language</h2>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Language Preference</p>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred language for the interface
                </p>
              </div>
              <LanguageSwitcher />
            </div>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Sign out</p>
                <p className="text-sm text-muted-foreground">
                  Sign out of your account
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