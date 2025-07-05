import { Suspense } from 'react'
import { client, blogPostsQuery, categoriesQuery } from '@/lib/sanity'
import { BlogPost, Category } from '@/lib/sanity'
import BlogSearchResults from '@/components/blog/BlogSearchResults'

async function getSearchData() {
  try {
    const [posts, categories] = await Promise.all([
      client.fetch<BlogPost[]>(blogPostsQuery),
      client.fetch<Category[]>(categoriesQuery)
    ])
    
    return { posts, categories }
  } catch (error) {
    console.error('Error fetching search data:', error)
    return { 
      posts: [] as BlogPost[], 
      categories: [] as Category[] 
    }
  }
}

/** @param {{ searchParams: { q?: string, category?: string } }} props */
export default async function SearchPage({ searchParams }: any) {
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
