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
      return defaultImage()
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
      return defaultImage()
    }

    const authorName = command.profiles?.full_name || command.profiles?.username || 'Anonymous'
    const commandName = command.name
    const description = command.description || `A custom slash command by ${authorName}`

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: 60,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#4B5563',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: 36,
                  fontWeight: 'bold',
                }}
              >
                》
              </div>
            </div>
            <div
              style={{
                color: '#6B7280',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Slash Commands
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              flex: 1,
            }}
          >
            <div
              style={{
                color: '#1F2937',
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 16,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              /{commandName}
            </div>
            
            <div
              style={{
                color: '#6B7280',
                fontSize: 24,
                fontWeight: 400,
                lineHeight: 1.4,
                marginBottom: 32,
                maxWidth: '100%',
                wordBreak: 'break-word',
              }}
            >
              {description.length > 120 ? description.substring(0, 120) + '...' : description}
            </div>

            <div
              style={{
                color: '#9CA3AF',
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              by {authorName}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Error generating command OG image:', error)
    return defaultImage()
  }
}

function defaultImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#4B5563',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 24,
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              》
            </div>
          </div>
          <div
            style={{
              color: '#1F2937',
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            Slash Commands
          </div>
        </div>
        <div
          style={{
            color: '#6B7280',
            fontSize: 28,
            textAlign: 'center',
          }}
        >
          Command Not Found
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}