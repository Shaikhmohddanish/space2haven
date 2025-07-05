import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

// Get environment variables - using default values to ensure Sanity always works
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rtxewyqu'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-01'
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true'

// Always consider Sanity configured with the default project ID
const isConfigured = true

// Create the Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: process.env.SANITY_API_TOKEN, // Only needed if you want to update content with the client
})

// Create image URL builder
const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
})

export function urlFor(source: any) {
  // Handle the case when source is null or undefined
  if (!source) {
    // Return a placeholder image builder
    return {
      url: () => 'https://placehold.co/800x600?text=Image+Not+Found',
      width: (w: number) => ({ 
        height: (h: number) => ({ 
          url: () => `https://placehold.co/${w}x${h}?text=Image+Not+Found` 
        }),
        url: () => `https://placehold.co/${w}x600?text=Image+Not+Found`
      }),
      height: (h: number) => ({ 
        url: () => `https://placehold.co/800x${h}?text=Image+Not+Found` 
      }),
      auto: (format: string) => ({
        fit: (fit: string) => ({
          url: () => 'https://placehold.co/800x600?text=Image+Not+Found'
        })
      })
    };
  }
  
  // Use the Sanity image builder
  return imageBuilder.image(source);
}

// Helper function to get optimized image URL with parameters
export const urlForImage = (source: any) => {
  return urlFor(source).auto('format').fit('max')
}

// Configuration object for easy access
export const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
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
