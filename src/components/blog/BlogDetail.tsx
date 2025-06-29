'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CalendarDays, 
  Clock, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy,
  ArrowLeft,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react'
import { format } from 'date-fns'
import { PortableText } from '@portabletext/react'
import { BlogPost, urlFor } from '@/lib/sanity'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'
import PlaceholderImage from './PlaceholderImage'

interface BlogDetailProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

// Safe image component that handles demo and real images
const SafeImage = ({ src, alt, width, height, className, fill, priority }: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
}) => {
  const [imageError, setImageError] = useState(false)
  
  // Use placeholder for demo images or when there's an error
  if (imageError || src.includes('demo-image')) {
    return (
      <PlaceholderImage 
        width={width} 
        height={height} 
        className={className}
        fill={fill}
        text="Blog Image"
        icon="📰"
      />
    )
  }
  
  // For picsum.photos URLs, use regular img tag to avoid Next.js config issues
  if (src.includes('picsum.photos')) {
    if (fill) {
      return (
        <img
          src={src}
          alt={alt}
          className={`object-cover w-full h-full ${className || ''}`}
          onError={() => setImageError(true)}
        />
      )
    }
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setImageError(true)}
      />
    )
  }
  
  // For real Sanity images, use Next.js Image
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fill={fill}
      priority={priority}
      onError={() => setImageError(true)}
    />
  )
}

export default function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = `Check out this article: ${post.title}`

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(url)
          toast({
            title: "Link copied!",
            description: "The article link has been copied to your clipboard.",
          })
        } catch (err) {
          console.error('Failed to copy: ', err)
        }
        break
    }
    setShowShareMenu(false)
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <div className="my-8">
          <SafeImage
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || 'Article image'}
            width={800}
            height={600}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      ),
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 my-6 bg-blue-50 py-4 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      ),
      strong: ({ children }: any) => (
        <strong className="font-bold text-gray-900">{children}</strong>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ol>
      ),
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="outline" size="small" className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge
                key={category._id}
                variant="secondary"
                className="text-sm"
                style={{
                  backgroundColor: category.color ? `${category.color}20` : undefined,
                  borderColor: category.color || undefined,
                  color: category.color || undefined
                }}
              >
                {category.title}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            {post.author && (
              <div className="flex items-center space-x-2">
                {post.author.image && (
                  <SafeImage
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-1">
              <CalendarDays className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
            </div>

            {post.readTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="small"
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-500 border-red-500' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                size="small"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>

              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-2 z-10"
                >
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Twitter className="w-4 h-4 text-blue-400" />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                    <span>Copy Link</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.mainImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <SafeImage
                src={urlFor(post.mainImage).width(1200).height(800).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none bg-white rounded-xl p-8 shadow-sm"
        >
          <PortableText value={post.content} components={portableTextComponents} />
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <RelatedPostCard
                  key={relatedPost._id}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Insights
            </h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter and never miss an update on the latest real estate trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function RelatedPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/blog/${post.slug.current}`}>
        <div className="relative aspect-video overflow-hidden">
          {post.mainImage ? (
            <SafeImage
              src={urlFor(post.mainImage).width(400).height(300).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <PlaceholderImage 
              fill
              className="group-hover:scale-105 transition-transform duration-300"
              text={post.title}
              icon="📰"
            />
          )}
          
          {post.categories.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs"
              >
                {post.categories[0].title}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
            {post.readTime && (
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime} min</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
