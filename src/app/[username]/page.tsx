import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Code2, Lock, Globe, Users } from 'lucide-react'
import FollowButton from '@/components/follow-button'
import { getFollowStatus, getFollowCounts } from '@/lib/actions/follow-actions'
import { getUserByUsername } from '@/lib/user-utils'

interface UserPageProps {
  params: Promise<{ username: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params
  const supabase = await createClient()
  
  // Get user profile by username
  const profile = await getUserByUsername(username)
  if (!profile) {
    notFound()
  }

  const userId = profile.id
  const { data: { user } } = await supabase.auth.getUser()
  const isOwnProfile = user?.id === userId

  // Get follow status and counts
  const isFollowing = user ? await getFollowStatus(userId) : false
  const { followers, following } = await getFollowCounts(userId)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let commandsQuery = (supabase as any)
    .from('commands')
    .select('*')
    .eq('user_id', userId)
  
  // If not own profile, only show public commands
  if (!isOwnProfile) {
    commandsQuery = commandsQuery.eq('is_public', true)
  }
  
  const { data: commands, error } = await commandsQuery.order('created_at', { ascending: false })
  
  // Debug logging
  console.log('Debug info:')
  console.log('username:', username)
  console.log('userId:', userId)
  console.log('isOwnProfile:', isOwnProfile)
  console.log('commands:', commands)
  console.log('error:', error)

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
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {profile.avatar_url && (
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name || profile.username || 'User'}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {profile.full_name || profile.username || 'Anonymous User'}
                </h1>
                {profile.username && (
                  <p className="text-muted-foreground">@{profile.username}</p>
                )}
              </div>
            </div>
            {user && !isOwnProfile && (
              <FollowButton
                userId={userId}
                initialIsFollowing={isFollowing}
              />
            )}
          </div>
          
          {/* Follow stats */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href={`/${username}/followers`}
              className="flex items-center gap-1 hover:underline"
            >
              <Users className="h-4 w-4" />
              <span className="font-semibold">{followers}</span>
              <span className="text-muted-foreground">follower{followers !== 1 ? 's' : ''}</span>
            </Link>
            <Link
              href={`/${username}/following`}
              className="flex items-center gap-1 hover:underline"
            >
              <span className="font-semibold">{following}</span>
              <span className="text-muted-foreground">following</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Commands</h2>
          <div className="grid gap-4">
            {commands && commands.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              commands.map((command: any) => (
                <Link
                  key={command.id}
                  href={`/${username}/${command.slug}`}
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