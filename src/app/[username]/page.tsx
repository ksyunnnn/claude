import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Code2, Lock, Globe, Users } from 'lucide-react'
import FollowButton from '@/components/follow-button'
import { getFollowStatus, getFollowCounts } from '@/lib/actions/follow-actions'
import { getUserByIdentifier } from '@/lib/user-utils'
import type { Command } from '@/types/database'
import type { Metadata } from 'next'
import { getProfileTranslations, getCommonTranslations, getMetadataTranslations } from '@/lib/i18n/server'

interface UserPageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()
  const tProfile = await getProfileTranslations()
  const tCommon = await getCommonTranslations()
  const tMetadata = await getMetadataTranslations()
  
  // Get user profile by username or ID
  const profile = await getUserByIdentifier(username)
  if (!profile) {
    return {
      title: tCommon('userNotFound'),
    }
  }

  const userId = profile.id
  
  // Get follow counts
  const { followers, following } = await getFollowCounts(userId)
  
  // Get command count
  const { count: commandCount } = await supabase
    .from('commands')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('is_public', true)

  const userName = profile.full_name || profile.username || tProfile('anonymousUser')
  const title = `${userName} - ${tMetadata('siteName')}`
  const description = `${userName} has ${commandCount || 0} public slash commands, ${followers} followers, and is following ${following} users.`
  const url = `/${username}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: tMetadata('siteName'),
      images: [
        {
          url: `/opengraph-image?title=${encodeURIComponent(userName)}&followers=${followers}&following=${following}&commands=${commandCount || 0}`,
          width: 1200,
          height: 630,
          alt: `${userName} profile`,
        },
      ],
      type: 'profile',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/opengraph-image?title=${encodeURIComponent(userName)}&followers=${followers}&following=${following}&commands=${commandCount || 0}`],
    },
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params
  const supabase = await createClient()
  const tProfile = await getProfileTranslations()
  const tCommon = await getCommonTranslations()
  
  // Get user profile by username or ID
  const profile = await getUserByIdentifier(username)
  if (!profile) {
    notFound()
  }

  const userId = profile.id
  const { data: { user } } = await supabase.auth.getUser()
  const isOwnProfile = user?.id === userId

  // Get follow status and counts
  const isFollowing = user ? await getFollowStatus(userId) : false
  const { followers, following } = await getFollowCounts(userId)

  let commandsQuery = supabase
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
{tCommon('backToHome')}
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
                  {profile.full_name || profile.username || tProfile('anonymousUser')}
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
              <span className="text-muted-foreground">{followers !== 1 ? tProfile('followers') : tProfile('follower')}</span>
            </Link>
            <Link
              href={`/${username}/following`}
              className="flex items-center gap-1 hover:underline"
            >
              <span className="font-semibold">{following}</span>
              <span className="text-muted-foreground">{tProfile('following')}</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{tProfile('commands')}</h2>
          <div className="grid gap-4">
            {commands && commands.length > 0 ? (
              commands.map((command: Command) => (
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
                {tProfile('noCommands')}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}