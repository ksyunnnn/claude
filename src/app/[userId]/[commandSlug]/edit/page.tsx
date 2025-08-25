import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { EditCommandForm } from './edit-command-form'

interface EditCommandPageProps {
  params: Promise<{ userId: string; commandSlug: string }>
}

export default async function EditCommandPage({ params }: EditCommandPageProps) {
  const { userId, commandSlug } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.id !== userId) {
    redirect('/')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: command } = await (supabase as any)
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
        <EditCommandForm command={command} />
      </main>
    </div>
  )
}