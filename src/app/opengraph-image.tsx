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
          {/* Double Chevron Logo */}
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
                display: 'flex',
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
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          Share and discover custom slash commands for Claude Code
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}