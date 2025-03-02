import { Metadata } from "next";
import { ReactNode } from "react";
import { Footer, Navbar } from "@/components";
import Head from "next/head";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Head>
                <title>Space2Haven | Real Estate & Interior Design</title>
                <meta name="description" content="Find the best real estate and interior design solutions with Space2Haven. Expert consultation and innovative design services tailored for you." />
                <meta name="keywords" content="Real Estate, Interior Design, Property, Home Decor, Space2Haven" />
                <meta name="author" content="Space2Haven" />
                <meta property="og:title" content="Space2Haven | Real Estate & Interior Design" />
                <meta property="og:description" content="Discover premium real estate services and modern interior design solutions with Space2Haven." />
                <meta property="og:image" content="https://space2haven.com/logo.svg" />
                <meta property="og:url" content="https://space2haven.com" />
                <meta name="robots" content="index, follow" />
            </Head>
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