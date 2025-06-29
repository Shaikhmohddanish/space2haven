import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { mockImageUrl } from './demoData'

// Check if Sanity is configured
const isConfigured = !!(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET)

export const client = isConfigured ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true, // set to false for fresh data
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_API_TOKEN, // Only needed if you want to update content with the client
}) : null

const builder = isConfigured && client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  // Handle demo data
  if (!isConfigured || !builder) {
    if (typeof source === 'string' || source?.asset?._ref?.startsWith('demo-image') || source?.asset?._ref?.startsWith('author-')) {
      const imageId = typeof source === 'string' ? source : source.asset._ref
      return {
        url: () => mockImageUrl(imageId),
        width: (w: number) => ({ 
          height: (h: number) => ({ 
            url: () => mockImageUrl(imageId, w, h) 
          }),
          url: () => mockImageUrl(imageId, w)
        }),
        height: (h: number) => ({ 
          url: () => mockImageUrl(imageId, 800, h) 
        })
      }
    }
    // Fallback for invalid sources
    return {
      url: () => mockImageUrl('fallback'),
      width: (w: number) => ({ 
        height: (h: number) => ({ 
          url: () => mockImageUrl('fallback', w, h) 
        }),
        url: () => mockImageUrl('fallback', w)
      }),
      height: (h: number) => ({ 
        url: () => mockImageUrl('fallback', 800, h) 
      })
    }
  }
  
  return builder.image(source)
}

// Blog post types
export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  content: any[] // Portable Text content
  categories: Category[]
  publishedAt: string
  author?: {
    name: string
    image?: {
      asset: {
        _ref: string
        _type: string
      }
    }
  }
  readTime?: number
  tags?: string[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
}

// GROQ queries
export const blogPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  categories[]->{
    _id,
    title,
    slug,
    color
  },
  author->{
    name,
    image
  },
  readTime,
  tags
}`

export const blogPostQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  content,
  publishedAt,
  categories[]->{
    _id,
    title,
    slug,
    color
  },
  author->{
    name,
    image
  },
  readTime,
  tags
}`

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color
}`

export const relatedPostsQuery = `*[_type == "post" && count((categories[]._ref)[@ in $categories]) > 0 && _id != $postId] | order(publishedAt desc)[0...6] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  categories[]->{
    _id,
    title,
    slug,
    color
  },
  readTime
}`

export const postsByCategoryQuery = `*[_type == "post" && count((categories[]._ref)[@ in [$categoryId]]) > 0] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  categories[]->{
    _id,
    title,
    slug,
    color
  },
  author->{
    name,
    image
  },
  readTime,
  tags
}`
