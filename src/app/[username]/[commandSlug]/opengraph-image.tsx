import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'
import { getUserByIdentifier } from '@/lib/user-utils'

export const runtime = 'edge'

export const alt = 'Command Preview'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

interface Props {
  params: Promise<{ username: string; commandSlug: string }>
}

export default async function Image({ params }: Props) {
  const { username, commandSlug } = await params
  
  try {
    const supabase = await createClient()
    
    // Get user profile by username or ID
    const profile = await getUserByIdentifier(username)
    if (!profile) {
      throw new Error('User not found')
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
      throw new Error('Command not found')
    }

    const authorName = command.profiles?.full_name || command.profiles?.username || username
    
    return new ImageResponse(
      (
        <div
          style={{
            background: '#4B5563',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
          }}
        >
          /{command.name} by {authorName}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    // Fallback to static content on error
    return new ImageResponse(
      (
        <div
          style={{
            background: '#4B5563',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
          }}
        >
          /{commandSlug} by {username}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}