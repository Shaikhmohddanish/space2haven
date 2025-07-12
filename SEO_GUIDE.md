# Space2Heaven SEO Implementation Guide

This document outlines the SEO implementation for the Space2Heaven website. It's designed to help the development team understand the SEO structure and make future enhancements.

## SEO Components and Files

1. **Root Layout Metadata** (`/src/app/layout.tsx`):
   - Contains base metadata for the entire website
   - Includes default title, description, and OpenGraph data
   - Sets up defaults for social sharing

2. **SEO Utilities** (`/src/lib/seo-utils.ts`):
   - Provides helper functions for generating metadata for different page types
   - Contains structured data generators for different content types
   - Makes it easy to maintain consistent SEO across the site

3. **JSON-LD Component** (`/src/components/JsonLd.tsx`):
   - Implements structured data in JSON-LD format
   - Helps search engines understand the content better

4. **Dynamic Metadata Generation**:
   - Blog posts: `/src/app/(client)/blog/[slug]/page.tsx`
   - Properties: `/src/app/(client)/(home)/properties/[id]/layout.tsx`
   - Home page: `/src/app/(client)/(home)/page.tsx`

5. **Sitemap and Robots** (`/src/app/sitemap.ts`, `/src/app/robots.ts`):
   - Dynamic sitemap generation for all static and dynamic routes
   - Proper robots.txt configuration

## Configuration

1. **Environment Variables** (`.env.local.example`):
   - Copy this file to `.env.local` and update the values
   - Set the correct base URL for your environment (development/production)
   - Add any Sanity CMS configuration if applicable

## Social Sharing

The website is configured to show rich previews when shared on:

1. **WhatsApp**:
   - Shows title, description, and image
   - Uses OpenGraph meta tags

2. **Social Media**:
   - Facebook/Instagram: Uses OpenGraph meta tags
   - Twitter: Uses Twitter Card meta tags

3. **Search Engines**:
   - Structured data for rich snippets
   - Proper metadata for SERPs

## Best Practices for Content Editors

1. **Blog Posts**:
   - Always add a compelling title (under 60 characters)
   - Write meta descriptions (150-160 characters)
   - Include a high-quality featured image (1200×630px ideal)
   - Use categories and tags appropriately

2. **Property Listings**:
   - Use descriptive titles with location information
   - Add detailed descriptions with key features
   - Include multiple high-quality images
   - Specify all property details accurately

## SEO Enhancement Roadmap

Future enhancements planned:

1. Implement breadcrumbs with structured data
2. Add FAQ structured data for common questions
3. Implement AMP for blog posts
4. Add local business structured data
5. Implement schema.org markup for reviews and ratings

---

For any questions or suggestions about the SEO implementation, please contact the development team.
