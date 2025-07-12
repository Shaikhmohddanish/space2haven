import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { client, blogPostQuery, relatedPostsQuery } from '@/lib/sanity'
import { BlogPost } from '@/lib/sanity'
import BlogDetail from '@/components/blog/BlogDetail'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import JsonLd from '@/components/JsonLd'
import { generateArticleSchema } from '@/lib/seo-utils'
import { Metadata } from 'next'

async function getBlogPost(slug: string) {
  try {
    console.log(`Fetching blog post with slug: ${slug}`)
    
    if (!slug) {
      console.log('No slug provided, returning 404')
      return null
    }

    const post = await client.fetch<BlogPost>(blogPostQuery, { slug })
    
    if (!post) {
      console.log(`Blog post with slug "${slug}" not found in Sanity`)
      return null
    }

    // Get related posts based on categories
    const categoryIds = post.categories?.map(cat => cat._id) || []
    const relatedPosts = await client.fetch<BlogPost[]>(relatedPostsQuery, {
      categories: categoryIds,
      postId: post._id
    })

    return { post, relatedPosts }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}


function BlogPostLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-6 animate-pulse"></div>
          <div className="flex gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </header>

        <div className="aspect-video bg-gray-200 rounded-xl mb-8 animate-pulse"></div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

export default async function BlogPostPage(props: any) {
  const { params } = props
  const slug = params.slug
  const data = await getBlogPost(slug)

  if (!data) {
    notFound()
  }

  const { post, relatedPosts } = data

  // Create structured data for the blog post
  let imageUrl = '/blog/blog-banner.jpg';
  
  if (post.mainImage?.asset?._ref) {
    // Extract the image ID from the reference
    const refParts = post.mainImage.asset._ref.split('-');
    const imageId = refParts[1];
    const extension = refParts[2];
    
    // Construct the Sanity CDN URL
    imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'project-id'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${imageId}-${refParts[refParts.length - 1]}`;
  }
    
  const articleSchema = generateArticleSchema({
    title: post.title,
    image: imageUrl,
    publishedAt: post.publishedAt,
    updatedAt: post.publishedAt,
    author: post.author,
    excerpt: post.excerpt,
    slug: params.slug
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <Navbar />
      <Suspense fallback={<BlogPostLoadingSkeleton />}>
        <BlogDetail post={post} relatedPosts={relatedPosts} />
      </Suspense>
      <Footer />
    </>
  )
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props;
  const slug = params.slug;
  const data = await getBlogPost(slug);

  if (!data) {
    return {
      title: 'Post Not Found | Space2Heaven Blog',
      description: 'The requested blog post could not be found.',
      robots: { index: false },
    };
  }

  const { post } = data;
  
  // Extract category names for keywords
  const categoryKeywords = post.categories?.map(cat => cat.title) || [];
  
  // Handle image URL for different Sanity configurations
  let imageUrl = '/blog/blog-banner.jpg';
  
  if (post.mainImage?.asset?._ref) {
    // Extract the image ID from the reference
    const refParts = post.mainImage.asset._ref.split('-');
    const imageId = refParts[1];
    const extension = refParts[2];
    
    // Construct the Sanity CDN URL
    imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'project-id'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${imageId}-${refParts[refParts.length - 1]}`;
  }

  return {
    title: `${post.title} - Space2Heaven Blog`,
    description: post.excerpt || `Read "${post.title}" and discover insights about real estate.`,
    keywords: [...categoryKeywords, 'real estate blog', 'property insights', 'real estate advice'],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read "${post.title}" and discover insights about real estate.`,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `/blog/${slug}`,
      siteName: 'Space2Heaven',
      authors: post.author ? [post.author.name] : ['Space2Heaven Team'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read "${post.title}" and discover insights about real estate.`,
      images: [imageUrl],
      creator: '@space2heaven',
    },
  }
}

// Generate static params for popular blog posts (optional)
export async function generateStaticParams() {
  try {
    const posts = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "post" && defined(slug.current)][0...10] {
        slug
      }`
    )

    return posts.map((post) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Return empty array if we can't fetch posts
    return []
  }
}
