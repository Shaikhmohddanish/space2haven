import { Metadata } from 'next';

// This function generates SEO metadata for any page
export function generateMetadata({
  title,
  description,
  image,
  url = '/',
  type = 'website',
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  // Default image path if none provided
  const defaultImage = '/images/homeBanner.webp';
  const imageUrl = image || defaultImage;
  
  // Common keywords for real estate
  const commonKeywords = [
    'real estate',
    'property',
    'buy home',
    'sell home',
    'Space2Heaven',
  ];
  
  // Combine custom keywords with common ones
  const allKeywords = [...keywords, ...commonKeywords];

  return {
    title,
    description,
    keywords: allKeywords,
    robots: noIndex ? {
      index: false,
      follow: true,
    } : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Space2Heaven',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Utility function to prepare schema.org structured data for properties
export function generatePropertySchema(property: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Space2Heaven',
    image: property.images?.[0] || '/images/homeBanner.webp',
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location?.city,
      addressRegion: property.location?.state,
      addressCountry: property.location?.country || 'India',
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Residence',
        name: property.title,
        description: property.description,
        numberOfRooms: property.bedrooms,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: property.area,
          unitCode: 'SQF',
        },
        price: property.price,
        priceCurrency: 'INR',
        image: property.images?.[0] || '/images/homeBanner.webp',
      },
    },
  };
}

// Utility function for blog article structured data
export function generateArticleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    image: article.image || '/blog/blog-banner.jpg',
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article.updatedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Space2Heaven Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Space2Heaven',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.svg',
      },
    },
    description: article.excerpt || article.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://space2heaven.com/blog/${article.slug}`,
    },
  };
}

// Utility function for the home page or organization structured data
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgency',
    name: 'Space2Heaven',
    description: 'Your trusted partner in buying and selling properties',
    url: 'https://space2heaven.com',
    logo: 'https://space2heaven.com/logo.svg',
    sameAs: [
      'https://www.facebook.com/space2heaven',
      'https://www.instagram.com/space2heaven',
      'https://twitter.com/space2heaven',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
    },
  };
}
