import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { demoBlogPosts, demoCategories } from '@/lib/demoData'

interface SitemapPost {
  slug: { current: string }
  publishedAt: string
}

interface SitemapCategory {
  slug: { current: string }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://space2heaven.com'

  try {
    let posts, categories
    if (!client) {
      // Fallback to demo data if client is not configured
      posts = demoBlogPosts.map(post => ({
        slug: post.slug,
        publishedAt: post.publishedAt
      }))
      categories = demoCategories.map(category => ({
        slug: category.slug
      }))
    } else {
      // Fetch all blog posts and categories
      [posts, categories] = await Promise.all([
        client.fetch<SitemapPost[]>(`
          *[_type == "post" && defined(slug.current)] {
            slug,
            publishedAt
          }
        `),
        client.fetch<SitemapCategory[]>(`
          *[_type == "category" && defined(slug.current)] {
            slug
          }
        `)
      ])
    }

    // Blog post URLs
    const postUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Category URLs
    const categoryUrls = categories.map((category) => ({
      url: `${baseUrl}/blog/category/${category.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Static blog URLs
    const staticUrls = [
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog/search`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      },
    ]

    return [...staticUrls, ...postUrls, ...categoryUrls]
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    
    // Return minimal sitemap on error
    return [
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]
  }
}
