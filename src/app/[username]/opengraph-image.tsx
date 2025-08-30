import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'
import { getUserByIdentifier } from '@/lib/user-utils'
import { getFollowCounts } from '@/lib/actions/follow-actions'

export const runtime = 'edge'

export const alt = 'User Profile'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

interface Props {
  params: Promise<{ username: string }>
}

export default async function Image({ params }: Props) {
  const { username } = await params

  try {
    const supabase = await createClient()
    
    // Get user profile by username or ID
    const profile = await getUserByIdentifier(username)
    if (!profile) {
      return defaultImage()
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

    const userName = profile.full_name || profile.username || 'Anonymous User'

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
                marginBottom: 24,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {userName}
            </div>
            
            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: 40,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    color: '#1F2937',
                    fontSize: 32,
                    fontWeight: 700,
                  }}
                >
                  {commandCount || 0}
                </div>
                <div
                  style={{
                    color: '#6B7280',
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  Commands
                </div>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    color: '#1F2937',
                    fontSize: 32,
                    fontWeight: 700,
                  }}
                >
                  {followers}
                </div>
                <div
                  style={{
                    color: '#6B7280',
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  Followers
                </div>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    color: '#1F2937',
                    fontSize: 32,
                    fontWeight: 700,
                  }}
                >
                  {following}
                </div>
                <div
                  style={{
                    color: '#6B7280',
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  Following
                </div>
              </div>
            </div>

            <div
              style={{
                color: '#9CA3AF',
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              @{profile.username || 'user'}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Error generating user OG image:', error)
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
          User Not Found
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}