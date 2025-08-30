import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Slash Commands'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
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
            {/* Modern command symbol - stylized chevron (scaled up for OGP) */}
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
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          Share and discover slash commands for Claude Code
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}