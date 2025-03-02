import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";


export const metadata: Metadata = {
  title: "Space2Heaven",
  description: "Find your perfect space with Space2Heaven – your trusted partner in buying and selling properties tailored just for you.",
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-sand-soft">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
