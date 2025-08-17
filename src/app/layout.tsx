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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://space2heaven.com"),
  alternates: { canonical: "/" },
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
        <PropertyCacheProvider>
          {children}
          <Toaster />
        </PropertyCacheProvider>
      </body>
    </html>
  );
}
