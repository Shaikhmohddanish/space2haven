import { Suspense } from 'react'
import { client, blogPostsQuery, categoriesQuery } from '@/lib/sanity'
import { demoBlogPosts, demoCategories } from '@/lib/demoData'
import BlogList from '@/components/blog/BlogList'
import { BlogPost, Category } from '@/lib/sanity'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'

async function getBlogData() {
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
      client!.fetch<BlogPost[]>(blogPostsQuery),
      client!.fetch<Category[]>(categoriesQuery)
    ])
    
    return { posts, categories }
  } catch (error) {
    console.error('Error fetching blog data, falling back to demo data:', error)
    return { 
      posts: demoBlogPosts as BlogPost[], 
      categories: demoCategories as Category[] 
    }
  }
}

function BlogLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-white/20 rounded w-96 mx-auto animate-pulse"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="h-12 bg-gray-200 rounded-xl w-80 animate-pulse"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-full w-24 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function BlogPage() {
  const { posts, categories } = await getBlogData()

  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<BlogLoadingSkeleton />}>
          <BlogList posts={posts} categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'Blog - Space2Heaven',
  description: 'Discover insights, tips, and stories from the world of real estate. Stay updated with the latest trends and expert advice.',
  openGraph: {
    title: 'Blog - Space2Heaven',
    description: 'Discover insights, tips, and stories from the world of real estate.',
    type: 'website',
  },
}
