import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Code2, Lock, Globe } from 'lucide-react'

interface UserPageProps {
  params: Promise<{ userId: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  const isOwnProfile = user?.id === userId

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase as any)
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (!profile) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: commands } = await (supabase as any)
    .from('commands')
    .select('*')
    .eq('user_id', userId)
    .eq('is_public', isOwnProfile ? undefined : true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {profile.full_name || profile.username || 'Anonymous User'}
          </h1>
          {profile.username && (
            <p className="text-muted-foreground">@{profile.username}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Commands</h2>
          <div className="grid gap-4">
            {commands && commands.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              commands.map((command: any) => (
                <Link
                  key={command.id}
                  href={`/${userId}/${command.slug}`}
                  className="block border rounded-lg p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        {command.name}
                      </h3>
                      {command.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {command.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      {command.is_public ? (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8 border rounded-lg">
                No commands yet
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}