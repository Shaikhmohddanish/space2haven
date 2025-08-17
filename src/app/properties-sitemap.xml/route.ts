import { NextResponse } from 'next/server'
import PropertyModel from '@/models/propertyModel'
import { connectDB } from '@/lib/dbConnection'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://space2heaven.com'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = Math.min(parseInt(searchParams.get('limit') || '1000', 10), 5000)

    const skip = (page - 1) * pageSize
    const properties = await PropertyModel.find({}, { slug: 1, updatedAt: 1, createdAt: 1 })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()

    const urls = properties
      .map((p: any) => {
        const url = `${BASE_URL}/properties/${p.slug || p._id}`
        const lastMod = new Date(p.updatedAt || p.createdAt || Date.now()).toISOString()
        return `<url><loc>${url}</loc><lastmod>${lastMod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      })
      .join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}


