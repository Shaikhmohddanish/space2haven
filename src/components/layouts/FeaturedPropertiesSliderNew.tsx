"use client";

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import '../../app/styles/slider.css';
import '../../app/styles/featured-slider-new.css';

interface Property {
  id: string;
  title: string;
  location: string;
  developer: {
    name: string;
    logo: string;
  };
  images: string[];
  configuration: string;
  area: {
    min: number;
    max: number;
  };
  possession: string;
  price: number;
  badges: string[];
  isReraVerified: boolean;
  hasOffers: boolean;
}

const properties: Property[] = [
  {
    id: 'elixir-reserve',
    title: 'L&T Elixir Reserve',
    location: 'at Powai by LnT Realty',
    developer: {
      name: 'L&T Realty',
      logo: '/images/developers/lnt.svg'
    },
    images: ['/images/projects/elixir-reserve.svg'],
    configuration: '2, 3 & 4 BHK Apartment',
    area: {
      min: 840,
      max: 2000
    },
    possession: 'Dec 2027',
    price: 2.98,
    badges: ['RERA Verified', 'Offers Available'],
    isReraVerified: true,
    hasOffers: true
  },
  {
    id: 'proviso-galaxy',
    title: 'Proviso Galaxy Maplewoods',
    location: 'at Airoli by Galaxy Group and Proviso Group',
    developer: {
      name: 'Galaxy Group',
      logo: '/images/developers/galaxy.svg'
    },
    images: ['/images/projects/galaxy-maplewoods.svg'],
    configuration: '2 & 3 BHK Apartment',
    area: {
      min: 640,
      max: 850
    },
    possession: 'Dec 2029',
    price: 1.36,
    badges: ['RERA Verified', 'Offers Available'],
    isReraVerified: true,
    hasOffers: true
  },
  {
    id: 'lt-crossroads',
    title: 'L&T 77 Crossroads',
    location: 'at Ghatkopar East by LnT Realty',
    developer: {
      name: 'L&T Realty',
      logo: '/images/developers/lnt.svg'
    },
    images: ['/images/projects/lt-crossroads.svg'],
    configuration: '1 & 2 BHK Apartment',
    area: {
      min: 413,
      max: 637
    },
    possession: 'Dec 2026',
    price: 1.15,
    badges: ['RERA Verified'],
    isReraVerified: true,
    hasOffers: false
  }
];

const FeaturedPropertiesSliderNew = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const splideRef = React.useRef<any>(null);

  const handleThumbnailClick = (idx: number) => {
    setActiveIndex(idx);
    splideRef.current?.go(idx);
  };

  const handleMove = (e: any) => {
    if (e && typeof e.index === 'number') {
      setActiveIndex(e.index);
    }
  };

  return (
    <div className="featured-properties-new">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Featured Projects in Mumbai
            </h2>
            <p className="text-gray-600">
              Best Projects in Mumbai to explore
            </p>
          </div>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            View All
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {properties.map((property, idx) => (
            <button
              key={property.id}
              onClick={() => handleThumbnailClick(idx)}
              className={`flex-shrink-0 w-32 h-20 relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                idx === activeIndex ? 'ring-2 ring-purple-600' : ''
              }`}
            >
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 transition-colors ${
                idx === activeIndex ? 'bg-black/10' : 'bg-black/20 hover:bg-black/10'
              }`} />
            </button>
          ))}
        </div>

        <Splide
          ref={splideRef}
          onMove={handleMove}
          options={{
            perPage: 1,
            gap: '1rem',
            arrows: false,
            pagination: true,
            breakpoints: {
              1024: { perPage: 1 }
            }
          }}
          className="featured-slider-new"
        >
          {properties.map((property) => (
            <SplideSlide key={property.id}>
              <div className="property-card">
                {/* Main Image */}
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {/* Developer Logo */}
                  <div className="developer-badge">
                    <div className="relative w-8 h-8">
                      <Image
                        src={property.developer.logo}
                        alt={property.developer.name}
                        fill
                        className="object-contain rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium">{property.developer.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {property.location}
                      </p>
                    </div>
                    <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.isReraVerified && (
                      <span className="badge badge-rera">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        RERA Verified
                      </span>
                    )}
                    {property.hasOffers && (
                      <span className="badge badge-offers">
                        Offers Available
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-900 font-medium">
                      {property.configuration}
                    </p>
                    <p className="text-gray-600">
                      {property.area.min} - {property.area.max} SQFT
                    </p>
                    <p className="text-gray-600">
                      {property.possession} Possession
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="price-tag">
                      <span className="price-amount">₹{property.price} Cr</span>
                      <span className="price-suffix">onwards</span>
                    </div>
                    <div>
                      <button className="action-button action-button-primary">
                        Contact Now
                      </button>
                    </div>
                  </div>

                  {/* Compare and Share */}
                  <div className="footer-actions">
                    <button className="footer-button compare-button">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Add to compare
                    </button>
                    <button className="footer-button share-button">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share Details
                    </button>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default FeaturedPropertiesSliderNew;
