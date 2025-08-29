import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CommandForm } from './command-form'
import { Navigation } from '@/components/navigation'

export default async function NewCommandPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // Get user profile to get username
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Create New Command</h1>
        <CommandForm userId={user.id} username={profile?.username} />
      </main>
    </div>
  )
}