import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from env or default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://space2heaven.com';
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/properties',
    '/privacy-policy',
    '/terms',
    '/calculate-emi',
    '/loan-eligibility',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic routes - properties
  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const propertiesResponse = await fetch(`/api/properties`, { 
      cache: 'no-store'
    });
    const properties = await propertiesResponse.json();
    
    propertyRoutes = properties.map((property: any) => ({
      url: `${baseUrl}/properties/${property.slug || property._id}`,
      lastModified: new Date(property.updatedAt || property.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching properties for sitemap:', error);
  }

  // Fetch dynamic routes - blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogResponse = await fetch(`/api/blog/posts`, { 
      cache: 'no-store'
    });
    const blogPosts = await blogResponse.json();
    
    blogRoutes = blogPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
