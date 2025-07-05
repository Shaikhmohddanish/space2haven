import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { client, postsByCategoryQuery, categoriesQuery } from '@/lib/sanity'
import { BlogPost, Category } from '@/lib/sanity'
import BlogList from '@/components/blog/BlogList'

async function getCategoryData(categorySlug: string) {
  try {
    // First, get the category info
    const category = await client.fetch<Category>(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug: categorySlug }
    )

    if (!category) {
      return null
    }

    // Get posts for this category and all categories
    const [posts, allCategories] = await Promise.all([
      client.fetch<BlogPost[]>(postsByCategoryQuery, { categoryId: category._id }),
      client.fetch<Category[]>(categoriesQuery)
    ])

    return { posts, categories: allCategories, currentCategory: category }
  } catch (error) {
    console.error('Error fetching category data:', error)
    return null
  }
}

export default async function CategoryPage(props: any) {
  const { params } = props
  const data = await getCategoryData(params.category)

  if (!data) {
    notFound()
  }

  const { posts, categories, currentCategory } = data

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Category Hero Section */}
        <div 
          className="relative py-20"
          style={{
            background: currentCategory.color 
              ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}40)`
              : 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
          }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {currentCategory.title}
            </h1>
            {currentCategory.description && (
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                {currentCategory.description}
              </p>
            )}
            <div className="mt-4">
              <span className="text-lg text-gray-600">
                {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
              </span>
            </div>
          </div>
        </div>

        {/* Blog List Component */}
        <div className="py-12">
          <BlogList 
            posts={posts} 
            categories={categories} 
            currentCategory={currentCategory.slug.current}
          />
        </div>
      </div>
    </Suspense>
  )
}

export async function generateMetadata(props: any) {
  const { params } = props
  const data = await getCategoryData(params.category)

  if (!data) {
    return {
      title: 'Category Not Found',
    }
  }

  const { currentCategory, posts } = data

  return {
    title: `${currentCategory.title} - Space2Heaven Blog`,
    description: currentCategory.description || `Explore ${posts.length} articles in the ${currentCategory.title} category.`,
    openGraph: {
      title: `${currentCategory.title} - Space2Heaven Blog`,
      description: currentCategory.description || `Explore articles in the ${currentCategory.title} category.`,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  try {
    const categories = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "category" && defined(slug.current)] {
        slug
      }`
    )

    return categories.map((category) => ({
      category: category.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Return empty array if we can't fetch categories
    return []
  }
}
