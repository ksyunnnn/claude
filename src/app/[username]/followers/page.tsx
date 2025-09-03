import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { getFollowers } from '@/lib/actions/follow-actions'
import FollowButton from '@/components/follow-button'
import { getUserByIdentifier } from '@/lib/user-utils'
import type { FollowerWithProfile } from '@/types/supabase'
import { getFollowPageTranslations, getProfileTranslations } from '@/lib/i18n/server'

interface FollowersPageProps {
  params: Promise<{ username: string }>
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  const { username } = await params
  const supabase = await createClient()
  const tFollowPage = await getFollowPageTranslations()
  const tProfile = await getProfileTranslations()

  // Get user profile by username or ID
  const profile = await getUserByIdentifier(username)
  if (!profile) {
    notFound()
  }

  // Get current user for follow button states
  const { data: { user: currentUser } } = await supabase.auth.getUser()

  // Get followers
  const followers = await getFollowers(profile.id)

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
              {tFollowPage('backToProfile')}
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
                {profile.full_name || profile.username || tProfile('anonymousUser')}
              </h1>
              <p className="text-muted-foreground">
                {tFollowPage('followersCount', { count: followers.length })}
              </p>
            </div>
          </div>
        </div>

        {/* Followers List */}
        {followers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{tFollowPage('noFollowers')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {followers.map((follow: FollowerWithProfile) => {
              const followerProfile = follow.profiles
              const isCurrentUser = currentUser?.id === followerProfile.id
              
              return (
                <div
                  key={follow.follower_id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-card"
                >
                  <Link
                    href={`/${followerProfile.username || followerProfile.id}`}
                    className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
                  >
                    {followerProfile.avatar_url && (
                      <Image
                        src={followerProfile.avatar_url}
                        alt={followerProfile.full_name || followerProfile.username || 'User'}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-medium">
                        {followerProfile.full_name || followerProfile.username || tProfile('anonymousUser')}
                      </h3>
                      {followerProfile.username && followerProfile.full_name && (
                        <p className="text-sm text-muted-foreground">
                          @{followerProfile.username}
                        </p>
                      )}
                    </div>
                  </Link>
                  {currentUser && !isCurrentUser && (
                    <FollowButton
                      userId={followerProfile.id}
                      initialIsFollowing={false} // We'll implement this check later if needed
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