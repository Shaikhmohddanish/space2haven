import { ReactNode } from "react";
import { Footer, Navbar } from "@/components";

// Metadata now lives outside the component in Next.js App Router
export const metadata = {
    title: "Space2Haven | Real Estate & Interior Design",
    description: "Find the best real estate and interior design solutions with Space2Haven. Expert consultation and innovative design services tailored for you.",
    keywords: "Real Estate, Interior Design, Property, Home Decor, Space2Haven",
    authors: [{ name: "Space2Haven" }],
    openGraph: {
        title: "Space2Haven | Real Estate & Interior Design",
        description: "Discover premium real estate services and modern interior design solutions with Space2Haven.",
        images: [{ url: "https://space2haven.com/logo.svg" }],
        url: "https://space2haven.com",
    },
    robots: {
        index: true,
        follow: true,
    }
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <main>
                <Navbar />
                <div className="flex">
                    <section className="w-full min-h-screen flex-1 flex-col">
                        {children}
                    </section>
                </div>
                <Footer />
            </main>
        </>
    );
};

export default HomeLayout;