import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CommandActions } from '@/components/command-actions'
import { getUserByUsername } from '@/lib/user-utils'
import { LikeButton } from '@/components/like-button'
import { LikedUsersModal } from '@/components/liked-users-modal'
import { getLikeCount, getLikeStatus, getLikedUsers } from '@/lib/actions/like-actions'
import { isAuthenticated } from '@/lib/auth-utils'

interface CommandPageProps {
  params: Promise<{ username: string; commandSlug: string }>
}

export default async function CommandPage({ params }: CommandPageProps) {
  const { username, commandSlug } = await params
  const supabase = await createClient()
  
  // Get user profile by username
  const profile = await getUserByUsername(username)
  if (!profile) {
    notFound()
  }

  const userId = profile.id
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === userId

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: command } = await (supabase as any)
    .from('commands')
    .select(`
      *,
      profiles:user_id (
        username,
        full_name
      )
    `)
    .eq('user_id', userId)
    .eq('slug', commandSlug)
    .single()

  if (!command || (!command.is_public && !isOwner)) {
    notFound()
  }

  const authorName = command.profiles?.full_name || command.profiles?.username || 'Anonymous'

  // Get like data for the command
  let likeCount = 0
  let userIsLiked = false
  let likedUsers: any[] = []
  const userIsAuthenticated = await isAuthenticated()
  
  try {
    likeCount = await getLikeCount(command.id)
    userIsLiked = user ? await getLikeStatus(command.id) : false
    likedUsers = await getLikedUsers(command.id)
  } catch (error) {
    console.log('Like data fetch failed, using defaults:', error)
    // Use default values for development when Supabase is not configured
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/${username}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to {authorName}&apos;s commands
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{command.name}</h1>
              {command.description && (
                <p className="text-muted-foreground">{command.description}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                by <Link href={`/${username}`} className="hover:underline">{authorName}</Link>
              </p>
              
              {/* Like functionality - Always visible for all users */}
              <div className="flex items-center gap-4 mt-4">
                <LikeButton 
                  commandId={command.id}
                  initialIsLiked={userIsLiked}
                  initialLikeCount={likeCount}
                  isAuthenticated={userIsAuthenticated}
                />
                <LikedUsersModal 
                  likedUsers={likedUsers}
                  likeCount={likeCount}
                />
              </div>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Link href={`/${username}/${commandSlug}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Command Content</h2>
            <CommandActions content={command.content} />
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{command.content}</code>
          </pre>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">How to use</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Copy the command content above</li>
            <li>Create a file named <code className="bg-muted px-1 rounded">{command.slug}</code> in your <code className="bg-muted px-1 rounded">.claude/commands</code> directory</li>
            <li>Paste the content and save the file</li>
            <li>Use <code className="bg-muted px-1 rounded">/{command.slug}</code> in Claude Code to run this command</li>
          </ol>
        </div>
      </main>
    </div>
  )
}