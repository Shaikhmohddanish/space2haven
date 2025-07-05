import { Suspense } from 'react'
import { client, blogPostsQuery, categoriesQuery } from '@/lib/sanity'
import BlogList from '@/components/blog/BlogList'
import { BlogPost, Category } from '@/lib/sanity'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'

async function getBlogData() {
  try {
    const [posts, categories] = await Promise.all([
      client.fetch<BlogPost[]>(blogPostsQuery, {}, { cache: 'no-store' }),
      client.fetch<Category[]>(categoriesQuery, {}, { cache: 'no-store' })
    ])
    
    return { posts, categories }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    // Return empty arrays if there's an error
    return { 
      posts: [] as BlogPost[], 
      categories: [] as Category[] 
    }
  }
}

function BlogLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Blog Banner with dark overlay */}
      <div className="relative flex flex-col items-center justify-center text-center w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/blog/blog-banner.jpg"
            alt="Space2Haven Blog Banner"
            className="object-cover object-center w-full h-full pointer-events-none select-none"
            style={{ zIndex: 0 }}
          />
        </div>
        <div className="relative z-30 max-w-2xl mx-auto space-y-6 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-pulse">
            Blog
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-medium animate-pulse">
            Discover insights, tips, and stories from the world of real estate.
          </p>
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
