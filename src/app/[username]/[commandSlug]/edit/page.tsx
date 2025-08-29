import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { EditCommandForm } from '@/components/edit-command-form'
import { getUserByUsername } from '@/lib/user-utils'

interface EditCommandPageProps {
  params: Promise<{ username: string; commandSlug: string }>
}

export default async function EditCommandPage({ params }: EditCommandPageProps) {
  const { username, commandSlug } = await params
  const supabase = await createClient()
  
  // Get user profile by username
  const profile = await getUserByUsername(username)
  if (!profile) {
    notFound()
  }

  const userId = profile.id
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.id !== userId) {
    redirect('/')
  }

  const { data: command } = await supabase
    .from('commands')
    .select('*')
    .eq('user_id', userId)
    .eq('slug', commandSlug)
    .single()

  if (!command) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Edit Command</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <EditCommandForm command={command} username={username} />
      </main>
    </div>
  )
}