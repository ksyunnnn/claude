import { createClient } from '@/lib/supabase/server'
import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { Code2, Plus, Github } from 'lucide-react'
import Link from 'next/link'

export async function Navigation() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
          <Link 
            href="https://github.com/ksyunnnn/claude" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors ml-2"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  )
}