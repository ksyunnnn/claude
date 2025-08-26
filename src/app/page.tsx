import { createClient } from '@/lib/supabase/server'
import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { Code2, Plus } from 'lucide-react'
import Link from 'next/link'
import { CommandList } from './command-list'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user profile to get username
  let profile = null
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Code2 className="h-6 w-6" />
            Claude Commands
          </Link>
          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Command
                  </Button>
                </Link>
                <Link href={`/${profile?.username || user.id}`}>
                  <Button variant="ghost" size="sm">
                    My Commands
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" size="sm">
                    Settings
                  </Button>
                </Link>
              </>
            ) : (
              <LoginButton />
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Share Your Claude Code Commands
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and share custom slash commands for Claude Code. 
            Enhance your development workflow with community-created commands.
          </p>
        </div>

        <CommandList />
      </main>
    </div>
  )
}