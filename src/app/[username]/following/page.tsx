import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { getFollowing } from '@/lib/actions/follow-actions'
import FollowButton from '@/components/follow-button'
import { getUserByUsername } from '@/lib/user-utils'
import type { FollowingWithProfile } from '@/types/supabase'

interface FollowingPageProps {
  params: Promise<{ username: string }>
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const { username } = await params
  const supabase = await createClient()

  // Get user profile by username
  const profile = await getUserByUsername(username)
  if (!profile) {
    notFound()
  }

  // Get current user for follow button states
  const { data: { user: currentUser } } = await supabase.auth.getUser()

  // Get following
  const following = await getFollowing(profile.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/${username}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to profile
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {profile.avatar_url && (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || profile.username || 'User'}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {profile.full_name || profile.username || 'Anonymous'}
              </h1>
              <p className="text-muted-foreground">
                Following {following.length} user{following.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Following List */}
        {following.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Not following anyone yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {following.map((follow: FollowingWithProfile) => {
              const followingProfile = follow.profiles
              const isCurrentUser = currentUser?.id === followingProfile.id
              
              return (
                <div
                  key={follow.following_id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-card"
                >
                  <Link
                    href={`/${followingProfile.username || followingProfile.id}`}
                    className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
                  >
                    {followingProfile.avatar_url && (
                      <Image
                        src={followingProfile.avatar_url}
                        alt={followingProfile.full_name || followingProfile.username || 'User'}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-medium">
                        {followingProfile.full_name || followingProfile.username || 'Anonymous'}
                      </h3>
                      {followingProfile.username && followingProfile.full_name && (
                        <p className="text-sm text-muted-foreground">
                          @{followingProfile.username}
                        </p>
                      )}
                    </div>
                  </Link>
                  {currentUser && !isCurrentUser && (
                    <FollowButton
                      userId={followingProfile.id}
                      initialIsFollowing={true} // Since we're on the following page, we know this is true
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}