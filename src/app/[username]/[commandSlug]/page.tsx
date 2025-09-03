import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CommandActions } from '@/components/command-actions'
import { getUserByIdentifier } from '@/lib/user-utils'
import { LikeButton } from '@/components/like-button'
import { LikedUsersModal, type LikedUser } from '@/components/liked-users-modal'
import { getLikeCount, getLikeStatus, getLikedUsers } from '@/lib/actions/like-actions'
import { isAuthenticated } from '@/lib/auth-utils'
import { LikeErrorHandler } from '@/components/like-error-handler'
import type { Metadata } from 'next'
import { getCommandTranslations, getCommonTranslations, getMetadataTranslations } from '@/lib/i18n/server'

interface CommandPageProps {
  params: Promise<{ username: string; commandSlug: string }>
}

export async function generateMetadata({ params }: CommandPageProps): Promise<Metadata> {
  const { username, commandSlug } = await params
  const tCommon = await getCommonTranslations()
  const tMetadata = await getMetadataTranslations()
  const tCommand = await getCommandTranslations()
  const supabase = await createClient()
  
  // Get user profile by username or ID
  const profile = await getUserByIdentifier(username)
  if (!profile) {
    return {
      title: 'Command Not Found',
    }
  }

  const userId = profile.id

  const { data: command } = await supabase
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

  if (!command) {
    return {
      title: tCommon('commandNotFound'),
    }
  }

  const authorName = command.profiles?.full_name || command.profiles?.username || tCommon('anonymousUser')
  const title = `${command.name} ${tCommand('by')} ${authorName} - ${tMetadata('siteName')}`
  const description = command.description || `${tCommand('by')} ${authorName}`
  const url = `/${username}/${commandSlug}`

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
          url: `/${username}/${commandSlug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${command.name} by ${authorName}`,
        },
      ],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/${username}/${commandSlug}/opengraph-image`],
    },
  }
}

export default async function CommandPage({ params }: CommandPageProps) {
  const { username, commandSlug } = await params
  const supabase = await createClient()
  const tCommand = await getCommandTranslations()
  const tCommon = await getCommonTranslations()
  
  // Get user profile by username or ID
  const profile = await getUserByIdentifier(username)
  if (!profile) {
    notFound()
  }

  const userId = profile.id
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === userId

  const { data: command } = await supabase
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

  const authorName = command.profiles?.full_name || command.profiles?.username || tCommon('anonymousUser')

  // Get like data for the command
  let likeCount = 0
  let userIsLiked = false
  let likedUsers: LikedUser[] = []
  let hasLikeError = false
  const likeErrorMessage = ''
  const userIsAuthenticated = await isAuthenticated()
  
  try {
    likeCount = await getLikeCount(command.id)
    userIsLiked = user ? await getLikeStatus(command.id) : false
    likedUsers = await getLikedUsers(command.id)
  } catch (error) {
    hasLikeError = true
    // This error message is already handled by LikeErrorHandler component
    // likeErrorMessage = 'いいね機能が一時的に利用できません'
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Like data fetch failed:', error)
    }
    // Use default values when error occurs
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/${username}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {tCommand('backToCommands', { username: authorName })}
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
                {tCommand('by')} <Link href={`/${username}`} className="hover:underline">{authorName}</Link>
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
                    {tCommand('edit')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{tCommand('content')}</h2>
            <CommandActions content={command.content} />
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{command.content}</code>
          </pre>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">{tCommand('howToUse')}</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>{tCommand('instruction1')}</li>
            <li>{tCommand('instruction2', { filename: command.slug })}</li>
            <li>{tCommand('instruction3')}</li>
            <li>{tCommand('instruction4', { commandName: command.slug })}</li>
          </ol>
        </div>
      </main>
      
      {/* Error handler for like functionality */}
      <LikeErrorHandler 
        hasError={hasLikeError}
        errorMessage={likeErrorMessage}
      />
    </div>
  )
}