import { Suspense } from 'react'
import { client, blogPostsQuery, categoriesQuery } from '@/lib/sanity'
import { BlogPost, Category } from '@/lib/sanity'
import { demoBlogPosts, demoCategories } from '@/lib/demoData'
import BlogSearchResults from '@/components/blog/BlogSearchResults'

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
  }
}

async function getSearchData() {
  try {
    // Check if Sanity is configured
    if (!client) {
      console.log('Using demo data - Sanity not configured')
      return { 
        posts: demoBlogPosts as BlogPost[], 
        categories: demoCategories as Category[] 
      }
    }

    const [posts, categories] = await Promise.all([
      client.fetch<BlogPost[]>(blogPostsQuery),
      client.fetch<Category[]>(categoriesQuery)
    ])
    
    return { posts, categories }
  } catch (error) {
    console.error('Error fetching search data, falling back to demo data:', error)
    return { 
      posts: demoBlogPosts as BlogPost[], 
      categories: demoCategories as Category[] 
    }
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { posts, categories } = await getSearchData()
  const query = searchParams.q || ''
  const categoryFilter = searchParams.category || ''

  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <BlogSearchResults 
        posts={posts} 
        categories={categories}
        initialQuery={query}
        initialCategory={categoryFilter}
      />
    </Suspense>
  )
}

export const metadata = {
  title: 'Search Blog - Space2Heaven',
  description: 'Search through our blog articles to find insights, tips, and stories about real estate.',
}
