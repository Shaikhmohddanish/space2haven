'use client';

import Image from "next/image"
import Link from "next/link"
import { MenuBar, MobileNav } from ".."
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${scrolled 
          ? 'bg-black/40 backdrop-blur-md border-b border-white/5' 
          : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            aria-label="Space2Heaven - Home"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                loading='eager'
                src="/logo.svg"
                alt="Space2Heaven"
                fill
                className="object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Space2Heaven
            </h1>
          </Link>

          {/* Navigation Section */}
          <div className="flex items-center gap-6">
            <MenuBar />
            <MobileNav />

            {/* Contact Button - Desktop Only */}
            <div className="hidden md:block">
              <Link 
                href="/contact"
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${scrolled
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                  }
                `}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
