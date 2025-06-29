import { NextResponse } from 'next/server'
import { client, categoriesQuery } from '@/lib/sanity'
import { demoCategories } from '@/lib/demoData'

export async function GET() {
  try {
    if (!client) {
      // Fallback to demo data if client is not configured
      return NextResponse.json({ categories: demoCategories })
    }
    const categories = await client.fetch(categoriesQuery)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Categories API error:', error)
    // Fallback to demo data on error
    return NextResponse.json(
      { categories: demoCategories, error: 'Failed to fetch categories from Sanity, using demo data.' },
      { status: 200 }
    )
  }
}
