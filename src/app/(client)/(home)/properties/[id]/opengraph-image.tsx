import { ImageResponse } from 'next/og'
import { connectDB } from '@/lib/dbConnection'
import PropertyModel from '@/models/propertyModel'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// 1200 x 630 recommended
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProperty(idOrSlug: string) {
  await connectDB()
  const isObjectId = /^[a-fA-F0-9]{24}$/.test(idOrSlug)
  const doc = isObjectId
    ? await PropertyModel.findById(idOrSlug).lean()
    : await PropertyModel.findOne({ slug: idOrSlug }).lean()
  return doc as any
}

export default async function Image({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  const title: string = property?.title || 'Space2Heaven Property'
  const city: string = property?.address?.city || ''
  const price: string = property?.price ? `₹ ${property.price}` : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b1220',
          color: '#fff',
          padding: '48px',
          backgroundImage: property?.images?.[0]
            ? `url(${property.images[0]})`
            : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'rgba(0,0,0,0.55)',
          padding: '24px 28px',
          borderRadius: '12px',
          maxWidth: '1000px',
        }}>
          <div style={{ fontSize: 54, fontWeight: 800 }}>{title}</div>
          <div style={{ display: 'flex', gap: 24, fontSize: 28, fontWeight: 600 }}>
            {city && <div>{city}</div>}
            {price && <div>{price}</div>}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 600, opacity: 0.9 }}>space2heaven.com</div>
          <div style={{ fontSize: 22, opacity: 0.8 }}>Real Estate & Interior Design</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}


