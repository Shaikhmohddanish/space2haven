import { NextResponse } from 'next/server'
import { client, categoriesQuery } from '@/lib/sanity'

export async function GET() {
  try {
    const categories = await client.fetch(categoriesQuery)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { categories: [], error: 'Failed to fetch categories from Sanity.' },
      { status: 500 }
    )
  }
}
