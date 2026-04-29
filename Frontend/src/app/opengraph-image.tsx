import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'
export const alt = 'Britlyn - Architectural Design'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://britlyn.com'

  // Fetch logo as base64 for edge runtime compatibility
  const logoRes = await fetch(`${baseUrl}/images/business/B.png`)
  const logoBuffer = await logoRes.arrayBuffer()
  const logoUint8 = new Uint8Array(logoBuffer)
  let binary = ''
  const chunkSize = 8192
  for (let i = 0; i < logoUint8.length; i += chunkSize) {
    binary += String.fromCharCode(...Array.from(logoUint8.subarray(i, i + chunkSize)))
  }
  const logoSrc = `data:image/png;base64,${btoa(binary)}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F2F0EB',
          position: 'relative',
        }}
      >
        {/* Outer gold border */}
        <div
          style={{
            position: 'absolute',
            inset: '14px',
            border: '1.5px solid #C9A66B',
            display: 'flex',
          }}
        />

        {/* Inner subtle border */}
        <div
          style={{
            position: 'absolute',
            inset: '21px',
            border: '0.5px solid rgba(201, 166, 107, 0.38)',
            display: 'flex',
          }}
        />

        {/* Corner ornament — top left */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            width: '28px',
            height: '28px',
            borderTop: '2px solid #C9A66B',
            borderLeft: '2px solid #C9A66B',
            display: 'flex',
          }}
        />

        {/* Corner ornament — top right */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '28px',
            height: '28px',
            borderTop: '2px solid #C9A66B',
            borderRight: '2px solid #C9A66B',
            display: 'flex',
          }}
        />

        {/* Corner ornament — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '6px',
            left: '6px',
            width: '28px',
            height: '28px',
            borderBottom: '2px solid #C9A66B',
            borderLeft: '2px solid #C9A66B',
            display: 'flex',
          }}
        />

        {/* Corner ornament — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '6px',
            width: '28px',
            height: '28px',
            borderBottom: '2px solid #C9A66B',
            borderRight: '2px solid #C9A66B',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            gap: '0px',
            padding: '50px 80px',
          }}
        >
          {/* Business logo */}
          <img
            src={logoSrc}
            width={420}
            height={315}
            style={{ objectFit: 'contain' }}
          />

          {/* Gold decorative divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '18px',
              marginBottom: '18px',
            }}
          >
            <div
              style={{
                width: '180px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, #C9A66B)',
                display: 'flex',
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                background: '#C9A66B',
                transform: 'rotate(45deg)',
                display: 'flex',
              }}
            />
            <div
              style={{
                width: '180px',
                height: '1px',
                background: 'linear-gradient(to left, transparent, #C9A66B)',
                display: 'flex',
              }}
            />
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 18,
              color: '#3A3830',
              fontFamily: 'serif',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Premium Brass Hardware &amp; Interior Accessories
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 15,
              color: '#C9A66B',
              fontFamily: 'monospace',
              letterSpacing: '0.14em',
              marginTop: '12px',
            }}
          >
            www.britlyn.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
