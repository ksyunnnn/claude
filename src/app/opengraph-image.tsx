import { ImageResponse } from 'next/og'

export const alt = 'Claude Commands - コマンド共有プラットフォーム'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #4B5563 0%, #374151 50%, #1F2937 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 2px, transparent 2px)',
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Main logo/icon section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Large version of the command symbol */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '30px',
              marginRight: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Main chevron shape - larger version */}
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '24px solid white',
                  borderTop: '18px solid transparent',
                  borderBottom: '18px solid transparent',
                  marginRight: '8px',
                  opacity: 0.95,
                }}
              />
              
              {/* Secondary smaller chevron for depth */}
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '18px solid rgba(255, 255, 255, 0.7)',
                  borderTop: '14px solid transparent',
                  borderBottom: '14px solid transparent',
                }}
              />
            </div>
          </div>
          
          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0',
                lineHeight: 1,
              }}
            >
              Claude Commands
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '10px 0 0 0',
                fontWeight: 300,
              }}
            >
              Share Custom Slash Commands
            </p>
          </div>
        </div>
        
        {/* Description */}
        <p
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
            margin: '0',
          }}
        >
          Discover and share custom slash commands for Claude Code.
          <br />
          Enhance your development workflow with community-created commands.
        </p>
        
        {/* Subtle accent elements */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            width: '12px',
            height: '12px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            width: '8px',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}