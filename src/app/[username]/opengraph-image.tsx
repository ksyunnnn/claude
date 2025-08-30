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
            {/* Favicon-style Icon */}
            <div
              style={{
                width: 70,
                height: 70,
                backgroundColor: '#4B5563',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                position: 'relative',
              }}
            >
              {/* Modern command symbol - stylized chevron */}
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
          {/* Favicon-style Icon */}
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#4B5563',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 32,
              position: 'relative',
            }}
          >
            {/* Modern command symbol - stylized chevron */}
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
                  borderLeft: '18px solid white',
                  borderTop: '12px solid transparent',
                  borderBottom: '12px solid transparent',
                  marginRight: '6px',
                  opacity: 0.95,
                }}
              />
              
              {/* Secondary smaller chevron for depth */}
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '12px solid rgba(255, 255, 255, 0.7)',
                  borderTop: '9px solid transparent',
                  borderBottom: '9px solid transparent',
                }}
              />
            </div>
            
            {/* Subtle highlight dot */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '9px',
                height: '9px',
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '50%',
              }}
            />
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