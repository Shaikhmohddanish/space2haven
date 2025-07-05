import { NextRequest, NextResponse } from 'next/server'
import { client, blogPostsQuery } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let groqQuery = blogPostsQuery

    // Add filters if provided
    if (category || query) {
      const filters = []
      
      if (category) {
        filters.push(`count((categories[]._ref)[@ in [$categoryId]]) > 0`)
      }
      
      if (query) {
        filters.push(`(title match $query || excerpt match $query || tags[] match $query)`)
      }

      if (filters.length > 0) {
        groqQuery = groqQuery.replace(
          '*[_type == "post" && defined(slug.current)]',
          `*[_type == "post" && defined(slug.current) && (${filters.join(' && ')})` 
        )
      }
    }

    // Add pagination
    groqQuery += `[${offset}...${offset + limit}]`

    const params: Record<string, any> = {}
    if (category) params.categoryId = category
    if (query) params.query = `"${query}*"`

    const posts = await client.fetch(groqQuery, params)

    return NextResponse.json({
      posts,
      pagination: {
        limit,
        offset,
        hasMore: posts.length === limit
      }
    })

  } catch (error) {
    console.error('Blog search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search blog posts' },
      { status: 500 }
    )
  }
}
