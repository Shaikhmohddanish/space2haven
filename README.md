# Space2Heaven - Real Estate Platform

![Space2Heaven Logo](/public/logo.svg)

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Folder Structure](#folder-structure)
- [Integrations](#integrations)
  - [Sanity CMS](#sanity-cms)
  - [Authentication](#authentication)
  - [Image Storage](#image-storage)
- [Deployment](#deployment)
- [SEO Implementation](#seo-implementation)
- [Contributing](#contributing)
- [License](#license)

## Overview

Space2Heaven is a comprehensive real estate platform built with Next.js 15, designed to provide users with seamless property discovery, management, and transaction experiences. The platform offers property listings, blog content, admin functionality, and various tools like EMI calculators and loan eligibility checks for potential property buyers.

## Features

### 🏠 Property Management
- Property listing with detailed information
- Advanced property search and filtering
- Property categories and types
- Property images with gallery view

### 📝 Blog System
- Rich content management with Sanity.io
- Category-based organization with color coding
- Advanced search & filtering
- Related articles based on categories

### 👤 User Management
- User authentication and profile management
- Admin dashboard for content management
- Role-based access control

### 🧮 Tools & Calculators
- EMI Calculator
- Loan Eligibility Calculator
- Property comparison

### 🎯 Other Features
- Responsive design for all device types
- SEO optimized pages with proper meta tags
- Fast page loading with Next.js optimizations
- Social media integration

## Tech Stack

### Frontend
- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI components
- **Redux Toolkit**: State management
- **React Icons**: Icon library

### Backend
- **Next.js API Routes**: Server-side functionality
- **MongoDB/Mongoose**: Database and ORM
- **Sanity.io**: Headless CMS for blog content
- **JWT & bcrypt**: Authentication and security
- **Cloudinary**: Media storage and delivery

### Performance & Tools
- **Framer Motion**: Animations
- **Embla Carousel**: Modern carousel component
- **Swiper**: Touch slider
- **axios**: HTTP client

## Project Structure

The project follows the Next.js 15 app directory structure:

```
src/
├── app/                 # Next.js 15 app directory
│   ├── (client)/        # Client-side routes
│   │   ├── (home)/      # Home and property routes
│   │   ├── auth/        # Authentication routes
│   │   └── blog/        # Blog routes
│   ├── api/             # API routes
│   └── globals.css      # Global styles
├── components/          # Reusable components
├── features/            # Feature modules
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── models/              # Data models
└── utils/               # Helper utilities
```

## Getting Started

### Prerequisites

- Node.js (version 18.x or later)
- npm or yarn
- MongoDB instance
- Sanity.io account (for blog CMS)
- Cloudinary account (for image storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Shaikhmohddanish/space2haven.git
cd space2haven
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Sanity CMS (for blog)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

### Running the Application

```bash
# Development mode
npm run dev
# or
yarn dev

# Production build
npm run build
# or
yarn build

# Start production server
npm run start
# or
yarn start
```

## Development

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production application
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint for code quality
- `npm run type-check`: Run TypeScript type checking

### Folder Structure

- **components/**: Reusable UI components
- **features/**: Feature-specific components and logic
- **hooks/**: Custom React hooks
- **lib/**: Utility functions and helpers
- **models/**: MongoDB schemas and models
- **utils/**: Helper utilities
- **public/**: Static assets

## Integrations

### Sanity CMS

The blog system uses Sanity.io as a headless CMS. Refer to [BLOG_SETUP.md](/BLOG_SETUP.md) for detailed instructions on setting up and configuring the Sanity studio.

### Authentication

The application uses JWT (JSON Web Tokens) for authentication with secure HTTP-only cookies. User credentials are stored securely with bcrypt password hashing.

### Image Storage

Property images and blog images are stored in Cloudinary, optimized for web delivery with responsive sizes.

## Deployment

The application can be deployed to various platforms:

1. **Vercel (Recommended)**
   - Connect your GitHub repository
   - Configure environment variables
   - Deploy with automatic CI/CD

2. **Custom Server**
   - Build the application: `npm run build`
   - Start the server: `npm run start`
   - Use a process manager like PM2 for production

## SEO Implementation

The application follows best SEO practices as documented in [SEO_GUIDE.md](/SEO_GUIDE.md). Key features include:

- Proper meta tags for all pages
- OpenGraph and Twitter Card support
- Structured data with JSON-LD
- Dynamic sitemap generation
- Optimized robots.txt

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
