'use client'

import Image from "next/image"
import { useMemo } from "react"
import SearchWithRecommendations from "@/components/SearchWithRecommendations"

const HomeBanner = ({ bannerType }: { bannerType: string }) => {
    const bannerSrc = useMemo(
        () => bannerType === "main"
            ? "/images/homeBanner.webp"
            : "/images/interiorBanner.webp",
        [bannerType]
    )

    const headerText = useMemo(
        () => bannerType === "main"
            ? "Find Your Perfect Home"
            : "Transform Your Space",
        [bannerType]
    )

    const descriptionText = useMemo(
        () => bannerType === "main"
            ? "Discover your dream property with personalized solutions tailored to your lifestyle."
            : "Create stunning interiors that reflect your unique style and personality.",
        [bannerType]
    )

    return (
        <section className="relative w-full h-[600px] md:h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Enhanced Overlay */}
            <div className="absolute inset-0">
                <Image
                    sizes="100vw"
                    loading="eager"
                    src={bannerSrc}
                    alt="Banner"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75" />
            </div>

            {/* Main Content - Centered */}
            <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Content */}
                    <div className="text-center space-y-6 md:space-y-8">
                        {/* Welcome Badge */}
                        <div 
                            className="inline-flex items-center px-4 py-2 rounded-full 
                            bg-white/10 backdrop-blur-sm border border-white/20"
                        >
                            <span className="text-sm md:text-base font-medium text-white">
                                Welcome to Space2Heaven
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            {headerText}
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            {descriptionText}
                        </p>

                        {/* Search Section */}
                        {bannerType === "main" && (
                            <div className="mt-8 md:mt-10">
                                <div className="max-w-3xl mx-auto">
                                    <SearchWithRecommendations />
                                </div>
                                
                                {/* Search Suggestions */}
                                <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-400">
                                    <span>Popular searches:</span>
                                    <button className="hover:text-white transition-colors">
                                        Apartments
                                    </button>
                                    <span>•</span>
                                    <button className="hover:text-white transition-colors">
                                        Villas
                                    </button>
                                    <span>•</span>
                                    <button className="hover:text-white transition-colors">
                                        Penthouses
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* CTA Button - Only for Interior */}
                        {bannerType !== "main" && (
                            <div className="mt-8">
                                <button 
                                    className="inline-flex items-center gap-2 px-6 py-3 
                                    bg-white text-gray-900 rounded-lg font-medium 
                                    hover:bg-gray-100 transition-colors duration-200"
                                >
                                    Get Started
                                    <svg 
                                        className="w-4 h-4" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </section>
    )
}

export default HomeBanner
