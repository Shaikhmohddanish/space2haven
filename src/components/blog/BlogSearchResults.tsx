'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { BlogPost, Category, urlFor } from '@/lib/sanity'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface BlogSearchResultsProps {
  posts: BlogPost[]
  categories: Category[]
  initialQuery?: string
  initialCategory?: string
}

export default function BlogSearchResults({ 
  posts, 
  categories, 
  initialQuery = '', 
  initialCategory = '' 
}: BlogSearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Filter posts based on search and category
  useEffect(() => {
    setIsLoading(true)
    let filtered = posts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post =>
        post.categories.some(cat => cat.slug.current === selectedCategory)
      )
    }

    setFilteredPosts(filtered)
    setTimeout(() => setIsLoading(false), 300)
  }, [searchTerm, selectedCategory, posts])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('q', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    
    const queryString = params.toString()
    const newUrl = queryString ? `/blog/search?${queryString}` : '/blog/search'
    
    router.push(newUrl, { scroll: false })
  }, [searchTerm, selectedCategory, router])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
  }

  const hasActiveFilters = searchTerm || selectedCategory

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Search Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Search Our Blog
            </h1>
            <p className="text-xl text-blue-100">
              Find the insights you're looking for
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Search articles, topics, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-white/50"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Filter className="text-gray-500 w-5 h-5" />
            <span className="text-lg font-semibold text-gray-900">Filter by Category:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.slug.current ? '' : category.slug.current
                )}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.slug.current
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.slug.current 
                    ? category.color || '#2563eb' 
                    : undefined
                }}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1">
                  Category: {categories.find(c => c.slug.current === selectedCategory)?.title}
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-blue-600 hover:text-blue-800"
              >
                Clear all
              </Button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            {isLoading ? 'Searching...' : (
              <>
                {filteredPosts.length > 0 ? (
                  <>
                    Found <span className="font-semibold">{filteredPosts.length}</span> article
                    {filteredPosts.length !== 1 ? 's' : ''}
                    {hasActiveFilters && ' matching your criteria'}
                  </>
                ) : hasActiveFilters ? (
                  'No articles match your search criteria'
                ) : (
                  `Showing all ${posts.length} articles`
                )}
              </>
            )}
          </p>
        </div>

        {/* Search Results */}
        {isLoading ? (
          <SearchLoadingSkeleton />
        ) : filteredPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {filteredPosts.map((post, index) => (
              <SearchResultCard key={post._id} post={post} index={index} searchTerm={searchTerm} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              {hasActiveFilters 
                ? "Try adjusting your search terms or removing some filters."
                : "Start typing in the search box above to find articles."
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            )}
          </motion.div>
        )}

        {/* Suggestions */}
        {filteredPosts.length === 0 && hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug.current}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function SearchResultCard({ post, index, searchTerm }: { 
  post: BlogPost; 
  index: number; 
  searchTerm: string 
}) {
  // Highlight search terms in title and excerpt
  const highlightText = (text: string, term: string) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>')
  }

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
    >
      <Link href={`/blog/${post.slug.current}`} className="group">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="md:w-48 md:flex-shrink-0">
            <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(300).height(300).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-3xl text-blue-300">📰</div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.map((category) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="text-xs"
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
            <h3 
              className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(post.title, searchTerm) 
              }}
            />

            {/* Excerpt */}
            {post.excerpt && (
              <p 
                className="text-gray-600 mb-4 line-clamp-2"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(post.excerpt, searchTerm) 
                }}
              />
            )}

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                {post.readTime && <span>{post.readTime} min read</span>}
              </div>
              {post.author && <span>by {post.author.name}</span>}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function SearchLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl p-6 animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-48 h-32 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
