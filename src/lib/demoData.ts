// Demo data for blog development
export const demoBlogPosts = [
  {
    _id: '1',
    title: 'The Future of Real Estate: Top 10 Trends to Watch in 2024',
    slug: { current: 'future-real-estate-trends-2024' },
    excerpt: 'Discover the emerging trends that will shape the real estate industry in 2024, from smart homes to sustainable living and virtual reality tours.',
    mainImage: {
      asset: { _ref: 'demo-image-1', _type: 'reference' },
      alt: 'Modern smart home exterior'
    },
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The real estate industry is rapidly evolving...' }]
      }
    ],
    categories: [
      { _id: 'cat1', title: 'Market Trends', slug: { current: 'market-trends' }, color: '#3B82F6' }
    ],
    publishedAt: '2024-01-15T10:00:00Z',
    author: {
      name: 'Sarah Johnson',
      image: { asset: { _ref: 'author-1', _type: 'reference' } }
    },
    readTime: 8,
    tags: ['trends', 'technology', 'smart homes', 'sustainability']
  },
  {
    _id: '2',
    title: 'First-Time Home Buyer\'s Complete Guide: Everything You Need to Know',
    slug: { current: 'first-time-home-buyer-guide' },
    excerpt: 'A comprehensive guide for first-time homebuyers covering everything from financing options to negotiation strategies.',
    mainImage: {
      asset: { _ref: 'demo-image-2', _type: 'reference' },
      alt: 'Young couple looking at house plans'
    },
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Buying your first home is an exciting milestone...' }]
      }
    ],
    categories: [
      { _id: 'cat2', title: 'Home Buying', slug: { current: 'home-buying' }, color: '#10B981' }
    ],
    publishedAt: '2024-01-12T14:30:00Z',
    author: {
      name: 'Michael Chen',
      image: { asset: { _ref: 'author-2', _type: 'reference' } }
    },
    readTime: 12,
    tags: ['buying', 'first-time', 'mortgage', 'tips']
  },
  {
    _id: '3',
    title: 'Investment Property: How to Build Wealth Through Real Estate',
    slug: { current: 'investment-property-wealth-building' },
    excerpt: 'Learn proven strategies for building long-term wealth through real estate investments, including rental properties and REITs.',
    mainImage: {
      asset: { _ref: 'demo-image-3', _type: 'reference' },
      alt: 'Modern apartment building for investment'
    },
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Real estate has long been considered one of the most reliable...' }]
      }
    ],
    categories: [
      { _id: 'cat3', title: 'Investment', slug: { current: 'investment' }, color: '#8B5CF6' }
    ],
    publishedAt: '2024-01-10T09:15:00Z',
    author: {
      name: 'Emily Rodriguez',
      image: { asset: { _ref: 'author-3', _type: 'reference' } }
    },
    readTime: 10,
    tags: ['investment', 'wealth', 'rental', 'ROI']
  },
  {
    _id: '4',
    title: 'Sustainable Living: Eco-Friendly Home Features That Add Value',
    slug: { current: 'sustainable-eco-friendly-home-features' },
    excerpt: 'Explore eco-friendly home features that not only benefit the environment but also increase your property value and reduce utility costs.',
    mainImage: {
      asset: { _ref: 'demo-image-4', _type: 'reference' },
      alt: 'Solar panels on modern home roof'
    },
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'As environmental consciousness grows...' }]
      }
    ],
    categories: [
      { _id: 'cat4', title: 'Sustainability', slug: { current: 'sustainability' }, color: '#059669' }
    ],
    publishedAt: '2024-01-08T11:45:00Z',
    author: {
      name: 'David Kim',
      image: { asset: { _ref: 'author-4', _type: 'reference' } }
    },
    readTime: 7,
    tags: ['sustainability', 'green homes', 'solar', 'efficiency']
  },
  {
    _id: '5',
    title: 'Market Analysis: Understanding Current Real Estate Valuations',
    slug: { current: 'market-analysis-real-estate-valuations' },
    excerpt: 'Deep dive into current market conditions, pricing trends, and what they mean for buyers and sellers in today\'s real estate market.',
    mainImage: {
      asset: { _ref: 'demo-image-5', _type: 'reference' },
      alt: 'Real estate market charts and graphs'
    },
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Understanding market valuations is crucial...' }]
      }
    ],
    categories: [
      { _id: 'cat1', title: 'Market Trends', slug: { current: 'market-trends' }, color: '#3B82F6' }
    ],
    publishedAt: '2024-01-05T16:20:00Z',
    author: {
      name: 'Lisa Wang',
      image: { asset: { _ref: 'author-5', _type: 'reference' } }
    },
    readTime: 9,
    tags: ['market analysis', 'valuations', 'pricing', 'trends']
  },
  {
    _id: '6',
    title: 'Smart Home Technology: The Complete Integration Guide',
    slug: { current: 'smart-home-technology-integration-guide' },
    excerpt: 'Transform your home with the latest smart technology. Learn about automation systems, security features, and energy management.',
    mainImage: {
      asset: { _ref: 'demo-image-6', _type: 'reference' },
      alt: 'Smart home control panel and devices'
    },
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Smart home technology has evolved dramatically...' }]
      }
    ],
    categories: [
      { _id: 'cat5', title: 'Technology', slug: { current: 'technology' }, color: '#6366F1' }
    ],
    publishedAt: '2024-01-03T13:10:00Z',
    author: {
      name: 'Alex Thompson',
      image: { asset: { _ref: 'author-6', _type: 'reference' } }
    },
    readTime: 11,
    tags: ['smart homes', 'technology', 'automation', 'IoT']
  }
]

export const demoCategories = [
  { _id: 'cat1', title: 'Market Trends', slug: { current: 'market-trends' }, description: 'Latest trends and insights in real estate markets', color: '#3B82F6' },
  { _id: 'cat2', title: 'Home Buying', slug: { current: 'home-buying' }, description: 'Tips and guides for home buyers', color: '#10B981' },
  { _id: 'cat3', title: 'Investment', slug: { current: 'investment' }, description: 'Real estate investment strategies and advice', color: '#8B5CF6' },
  { _id: 'cat4', title: 'Sustainability', slug: { current: 'sustainability' }, description: 'Eco-friendly and sustainable living solutions', color: '#059669' },
  { _id: 'cat5', title: 'Technology', slug: { current: 'technology' }, description: 'Latest technology trends in real estate', color: '#6366F1' },
  { _id: 'cat6', title: 'Home Selling', slug: { current: 'home-selling' }, description: 'Expert advice for selling your property', color: '#DC2626' }
]

// Mock image URL generator for demo
export const mockImageUrl = (id: string, width = 800, height = 600) => {
  // Use different image categories based on the demo image ID
  const imageCategories = {
    'demo-image-1': 'house', // Modern smart home
    'demo-image-2': 'business', // Young couple with plans
    'demo-image-3': 'architecture', // Modern apartment building
    'demo-image-4': 'house', // Solar panels on home
    'demo-image-5': 'business', // Charts and graphs
    'demo-image-6': 'tech', // Smart home tech
    'author-1': 'people',
    'author-2': 'people',
    'author-3': 'people',
    'author-4': 'people',
    'author-5': 'people',
    'author-6': 'people',
    'fallback': 'house'
  }
  
  const category = imageCategories[id as keyof typeof imageCategories] || 'house'
  const seed = Math.abs(id.split('').reduce((a, b) => a + b.charCodeAt(0), 0))
  
  return `https://picsum.photos/${width}/${height}?random=${seed}&category=${category}`
}
