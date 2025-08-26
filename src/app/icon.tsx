import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#4B5563',
          borderRadius: '8px',
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
              borderLeft: '6px solid white',
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              marginRight: '2px',
              opacity: 0.95,
            }}
          />
          
          {/* Secondary smaller chevron for depth */}
          <div
            style={{
              width: '0',
              height: '0',
              borderLeft: '4px solid rgba(255, 255, 255, 0.7)',
              borderTop: '3px solid transparent',
              borderBottom: '3px solid transparent',
            }}
          />
        </div>
        
        {/* Subtle highlight dot */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '3px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    { ...size }
  )
}