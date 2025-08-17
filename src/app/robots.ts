export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://space2heaven.com/sitemap.xml',
    additionalSitemaps: [
      'https://space2heaven.com/sitemap-index.xml',
    ],
  };
}
