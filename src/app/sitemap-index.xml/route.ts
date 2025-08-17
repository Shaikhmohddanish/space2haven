import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/dbConnection'
import PropertyModel from '@/models/propertyModel'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://space2heaven.com'
const PAGE_SIZE = 10000

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const total = await PropertyModel.countDocuments({})
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    const sitemaps = Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1
      return `<sitemap><loc>${BASE_URL}/properties-sitemap.xml?page=${page}&limit=${PAGE_SIZE}</loc></sitemap>`
    }).join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (e) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}


