import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CommandForm } from './command-form'

export default async function NewCommandPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Create New Command</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <CommandForm userId={user.id} />
      </main>
    </div>
  )
}