# Blog System Documentation

## Overview

This is a comprehensive blog system built with Next.js 15 and Sanity.io CMS. It features:

- 📝 **Rich Content Management** with Sanity.io
- 🎨 **Category-based Organization** with color coding
- 🔍 **Advanced Search & Filtering**
- 📱 **Fully Responsive Design**
- ⚡ **Optimized Performance** with static generation
- 🔗 **SEO Optimized** with proper meta tags
- 📊 **Related Articles** based on categories
- 📧 **Newsletter Subscription**
- 🎯 **Professional UI/UX**

## Setup Instructions

### 1. Sanity.io Configuration

1. **Create a Sanity Project**
   ```bash
   npm install -g @sanity/cli
   sanity init
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env.local` and fill in your Sanity details:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

3. **Create Sanity Schemas**
   In your Sanity studio, create these document types:

   **Blog Post Schema (post.js)**
   ```javascript
   export default {
     name: 'post',
     title: 'Blog Post',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'string',
         validation: Rule => Rule.required()
       },
       {
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
           source: 'title',
           maxLength: 96,
         },
         validation: Rule => Rule.required()
       },
       {
         name: 'excerpt',
         title: 'Excerpt',
         type: 'text',
         rows: 4
       },
       {
         name: 'mainImage',
         title: 'Main Image',
         type: 'image',
         options: {
           hotspot: true,
         },
         fields: [
           {
             name: 'alt',
             type: 'string',
             title: 'Alternative Text',
           }
         ]
       },
       {
         name: 'categories',
         title: 'Categories',
         type: 'array',
         of: [{type: 'reference', to: {type: 'category'}}]
       },
       {
         name: 'publishedAt',
         title: 'Published at',
         type: 'datetime',
         validation: Rule => Rule.required()
       },
       {
         name: 'content',
         title: 'Content',
         type: 'array',
         of: [
           {
             type: 'block'
           },
           {
             type: 'image',
             options: {hotspot: true}
           }
         ]
       },
       {
         name: 'author',
         title: 'Author',
         type: 'reference',
         to: {type: 'author'}
       },
       {
         name: 'readTime',
         title: 'Read Time (minutes)',
         type: 'number'
       },
       {
         name: 'tags',
         title: 'Tags',
         type: 'array',
         of: [{type: 'string'}]
       }
     ],
     preview: {
       select: {
         title: 'title',
         author: 'author.name',
         media: 'mainImage',
       },
       prepare(selection) {
         const {author} = selection
         return Object.assign({}, selection, {
           subtitle: author && `by ${author}`,
         })
       },
     },
   }
   ```

   **Category Schema (category.js)**
   ```javascript
   export default {
     name: 'category',
     title: 'Category',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'string',
         validation: Rule => Rule.required()
       },
       {
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
           source: 'title',
           maxLength: 96,
         },
         validation: Rule => Rule.required()
       },
       {
         name: 'description',
         title: 'Description',
         type: 'text'
       },
       {
         name: 'color',
         title: 'Color',
         type: 'string',
         options: {
           list: [
             {title: 'Blue', value: '#3B82F6'},
             {title: 'Green', value: '#10B981'},
             {title: 'Purple', value: '#8B5CF6'},
             {title: 'Red', value: '#EF4444'},
             {title: 'Orange', value: '#F59E0B'},
             {title: 'Pink', value: '#EC4899'},
           ]
         }
       }
     ]
   }
   ```

   **Author Schema (author.js)**
   ```javascript
   export default {
     name: 'author',
     title: 'Author',
     type: 'document',
     fields: [
       {
         name: 'name',
         title: 'Name',
         type: 'string',
         validation: Rule => Rule.required()
       },
       {
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
           source: 'name',
           maxLength: 96,
         }
       },
       {
         name: 'image',
         title: 'Image',
         type: 'image',
         options: {
           hotspot: true,
         }
       },
       {
         name: 'bio',
         title: 'Bio',
         type: 'array',
         of: [
           {
             title: 'Block',
             type: 'block',
             styles: [{title: 'Normal', value: 'normal'}],
             lists: [],
           },
         ],
       },
     ],
     preview: {
       select: {
         title: 'name',
         media: 'image',
       },
     },
   }
   ```

### 2. Pages Structure

The blog system includes these pages:

- `/blog` - Main blog listing with search and filters
- `/blog/[slug]` - Individual blog post pages
- `/blog/category/[category]` - Category-specific listings
- `/blog/search` - Advanced search page

### 3. Components

#### Core Components

- **BlogList** - Main blog listing with filtering and pagination
- **BlogDetail** - Individual blog post display with related articles
- **BlogSearchResults** - Advanced search interface
- **BlogNavigation** - Navigation component for site header
- **NewsletterSignup** - Email subscription component

#### UI Components Used

- Button, Input, Badge components from shadcn/ui
- Framer Motion for animations
- Lucide React for icons

### 4. Features

#### Search & Filtering
- Real-time search across titles, excerpts, and tags
- Category-based filtering
- Advanced search page with URL state management

#### SEO Optimization
- Dynamic meta tags for each post
- Open Graph and Twitter Card support
- Automatic sitemap generation
- Structured data ready

#### Performance
- Static generation for popular posts
- Image optimization with Sanity CDN
- Lazy loading and progressive enhancement

#### Mobile Responsive
- Fully responsive design
- Touch-friendly interactions
- Optimized mobile navigation

### 5. Customization

#### Styling
- Tailwind CSS for consistent styling
- Custom color schemes per category
- Dark mode ready (add dark: classes)

#### Content Types
- Extend blog post schema for additional fields
- Add custom content blocks
- Create custom page templates

#### Integration
- Newsletter service integration (Mailchimp, ConvertKit, etc.)
- Analytics tracking
- Comment system integration

### 6. Development

#### Local Development
```bash
npm run dev
```

#### Building for Production
```bash
npm run build
npm start
```

#### Environment Variables
```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Optional
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### 7. Best Practices

#### Content Strategy
- Use descriptive, SEO-friendly titles
- Write compelling excerpts
- Tag articles appropriately
- Include high-quality featured images

#### Performance
- Optimize images in Sanity
- Use appropriate caching strategies
- Monitor Core Web Vitals

#### SEO
- Write unique meta descriptions
- Use proper heading hierarchy
- Include internal links
- Submit sitemap to search engines

## API Endpoints

- `GET /api/blog/search` - Search blog posts
- `GET /api/blog/categories` - Get all categories

## File Structure

```
src/
├── app/
│   └── (client)/
│       └── blog/
│           ├── page.tsx                 # Main blog page
│           ├── [slug]/
│           │   └── page.tsx            # Individual blog post
│           ├── category/
│           │   └── [category]/
│           │       └── page.tsx        # Category pages
│           ├── search/
│           │   └── page.tsx            # Search page
│           └── sitemap.ts              # Blog sitemap
├── components/
│   └── blog/
│       ├── BlogList.tsx                # Main blog listing
│       ├── BlogDetail.tsx              # Blog post detail
│       ├── BlogSearchResults.tsx       # Search results
│       ├── BlogNavigation.tsx          # Navigation component
│       ├── NewsletterSignup.tsx        # Newsletter component
│       └── index.ts                    # Component exports
├── lib/
│   └── sanity.ts                       # Sanity client & queries
└── components/
    └── ui/
        ├── badge.tsx                   # Badge component
        └── input.tsx                   # Input component
```

This blog system provides a solid foundation for a professional blog with room for customization and growth.
