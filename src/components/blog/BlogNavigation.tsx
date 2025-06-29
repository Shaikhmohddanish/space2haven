'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, BookOpen, Search, Tag, TrendingUp } from 'lucide-react'
import { Category } from '@/lib/sanity'

interface BlogNavigationProps {
  categories?: Category[]
  className?: string
}

export default function BlogNavigation({ categories = [], className = '' }: BlogNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([])

  useEffect(() => {
    // Show first 6 categories as featured
    setFeaturedCategories(categories.slice(0, 6))
  }, [categories])

  const popularTopics = [
    { name: 'Real Estate Trends', href: '/blog/search?q=trends' },
    { name: 'Investment Tips', href: '/blog/search?q=investment' },
    { name: 'Market Analysis', href: '/blog/search?q=market' },
    { name: 'Home Buying', href: '/blog/search?q=buying' },
  ]

  return (
    <div className={`relative ${className}`}>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        <Link 
          href="/blog"
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span className="font-medium">Blog</span>
        </Link>

        <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
            <span>Categories</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl border z-50"
              >
                <div className="p-6">
                  {/* Quick Links */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Quick Access
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/blog"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">All Articles</span>
                      </Link>
                      <Link
                        href="/blog/search"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Search className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Search</span>
                      </Link>
                    </div>
                  </div>

                  {/* Categories */}
                  {featuredCategories.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Categories
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {featuredCategories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/blog/category/${category.slug.current}`}
                            className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color || '#3B82F6' }}
                              />
                              <span className="text-sm font-medium">{category.title}</span>
                            </div>
                            {category.description && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                {category.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                      
                      {categories.length > 6 && (
                        <Link
                          href="/blog"
                          className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View all categories →
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Popular Topics */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Popular Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTopics.map((topic) => (
                        <Link
                          key={topic.name}
                          href={topic.href}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          {topic.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link 
          href="/blog/search"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Search
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">Blog</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-50"
            >
              <div className="p-4 space-y-4">
                <Link
                  href="/blog"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  All Articles
                </Link>
                
                <Link
                  href="/blog/search"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Search Blog
                </Link>

                {featuredCategories.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Categories</h4>
                    <div className="space-y-1">
                      {featuredCategories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/blog/category/${category.slug.current}`}
                          className="block py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
