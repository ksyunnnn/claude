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
    const description = command.description || ''
    
    
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            fontSize: 48,
            padding: 60,
          }}
        >
          {/* Header with icon and service name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Favicon-style icon */}
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
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Main chevron shape */}
                <div
                  style={{
                    width: '0',
                    height: '0',
                    borderLeft: '12px solid white',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    marginRight: '4px',
                    opacity: 0.95,
                  }}
                />
                {/* Secondary smaller chevron for depth */}
                <div
                  style={{
                    width: '0',
                    height: '0',
                    borderLeft: '8px solid rgba(255, 255, 255, 0.7)',
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                  }}
                />
              </div>
              {/* Subtle highlight dot */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '6px',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '50%',
                }}
              />
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

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <div style={{fontWeight: 'bold', color: '#1F2937', marginBottom: 16}}>
              {`/${command.name}`}
            </div>
            <div style={{color: "rgb(100, 116, 139)", fontSize: 24, marginBottom: 16}}>
              {description}
            </div>
            <div style={{color: "rgb(100, 116, 139)", fontSize: 24}}>{`by ${authorName}`}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch {
    // Fallback to static content on error
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            fontSize: 48,
            padding: 60,
          }}
        >
          {/* Header with icon and service name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            {/* Favicon-style icon */}
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
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Main chevron shape */}
                <div
                  style={{
                    width: '0',
                    height: '0',
                    borderLeft: '12px solid white',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    marginRight: '4px',
                    opacity: 0.95,
                  }}
                />
                {/* Secondary smaller chevron for depth */}
                <div
                  style={{
                    width: '0',
                    height: '0',
                    borderLeft: '8px solid rgba(255, 255, 255, 0.7)',
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                  }}
                />
              </div>
              {/* Subtle highlight dot */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '6px',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '50%',
                }}
              />
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

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <div style={{fontWeight: 'bold', color: '#1F2937', marginBottom: 16}}>
              {`/${commandSlug}`}
            </div>
            <div style={{color: "rgb(100, 116, 139)", fontSize: 24}}>{`by ${username}`}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}