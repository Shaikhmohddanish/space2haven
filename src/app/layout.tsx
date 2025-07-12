import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { PropertyCacheProvider } from "@/components/layouts/PropertyCacheContext";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Space2Heaven | Your Trusted Real Estate Partner",
    template: "%s | Space2Heaven"
  },
  description: "Find your perfect space with Space2Heaven – your trusted partner in buying and selling properties tailored just for you.",
  generator: "Next.js",
  applicationName: "Space2Heaven",
  referrer: "origin-when-cross-origin",
  keywords: ["real estate", "property", "buy home", "sell home", "luxury properties", "apartments", "houses", "real estate agency"],
  authors: [
    { name: "Space2Heaven Team" }
  ],
  creator: "Space2Heaven",
  publisher: "Space2Heaven",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://space2heaven.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Space2Heaven | Your Trusted Real Estate Partner",
    description: "Find your perfect space with Space2Heaven – your trusted partner in buying and selling properties tailored just for you.",
    url: "/",
    siteName: "Space2Heaven",
    images: [
      {
        url: "/images/homeBanner.webp",
        width: 1200,
        height: 630,
        alt: "Space2Heaven - Real Estate Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space2Heaven | Your Trusted Real Estate Partner",
    description: "Find your perfect space with Space2Heaven – your trusted partner in buying and selling properties tailored just for you.",
    images: ["/images/homeBanner.webp"],
    creator: "@space2heaven",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-sand-soft">
        <PropertyCacheProvider>  {/* ✅ Wrap Everything Inside Provider */}
          {children}
          <Toaster />
        </PropertyCacheProvider>
      </body>
    </html>
  );
}
