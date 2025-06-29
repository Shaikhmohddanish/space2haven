'use client'

import { useState, useEffect } from "react"
import Image from "next/image"

const WhoWeAre: React.FC = () => {
  const [showFullText, setShowFullText] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-purple-50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-purple-600 font-medium mb-3">About Us</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Who We Are
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-purple-600 rounded-full" />
            <div className="h-1 w-3 bg-purple-600 rounded-full" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image & Stats */}
          <div className="space-y-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/who-we-are.webp"
                alt="Space2Haven Office"
                width={600}
                height={400}
                className="w-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold">10+</div>
                    <div className="text-sm text-gray-200">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-gray-200">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "Expert Consultation",
                "End-to-End Service",
                "Legal Support",
                "Design Excellence"
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-purple-50/50"
                >
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="prose prose-lg">
              <div className={`text-gray-600 leading-relaxed space-y-4 ${!showFullText && 'line-clamp-[12]'}`}>
                <p>
                  At Space2Haven, we help people buy the perfect property so we can design it into a dream home. We know that finding a property in Mumbai, Thane, or Navi Mumbai isn't just about location—it involves negotiations, legal paperwork, construction challenges, and ultimately, creating a dream space that reflects your lifestyle.
                </p>
                <p>
                  That's why we provide a complete, end-to-end service, ensuring a hassle-free journey from house hunting to home styling. Whether you're searching for a home, investment property, or expert guidance in transforming your space, we take care of everything.
                </p>
                <p>
                  With our expertise in real estate and home design, you don't just buy a property—you step into a thoughtfully designed, ready-to-live space. Our goal is simple: Helping you buy, so we can design!
                </p>
              </div>
            </div>

            {/* See More Button */}
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              <span>{showFullText ? "Show less" : "Read more"}</span>
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${showFullText ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Contact Button */}
            <div className="pt-6">
              <a href="/contact">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200">
                  Contact Us
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
