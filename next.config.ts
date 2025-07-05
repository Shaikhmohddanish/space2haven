/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Allows Cloudinary-hosted images
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // ✅ Allows Picsum demo images
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // ✅ Allows Sanity CDN images
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/properties/:slug",
        destination: "/properties?id=:slug",
      },
    ];
  },
};

export default nextConfig;
