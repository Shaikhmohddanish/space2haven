"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "../../app/styles/slider.css";
import { useRouter } from "next/navigation";
import { IoCalendarOutline, IoLocationOutline, IoHomeOutline } from "react-icons/io5";
import GetInTouchPopup from "./GetInTouchPopup";
import Image from "next/image";

interface FeaturedPropertiesSliderProps {
  data: Property[];
}

const FeaturedPropertiesSlider = ({ data }: FeaturedPropertiesSliderProps) => {
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Splide
      options={{
        perPage: 3,
        gap: "2rem",
        arrows: false,
        pagination: true,
        padding: { left: "1rem", right: "1rem" },
        breakpoints: {
          1280: { perPage: 3, gap: "1.5rem" },
          1024: { perPage: 2, gap: "1.5rem" },
          768: { perPage: 2, gap: "1rem" },
          640: { perPage: 1, gap: "1rem", padding: { left: "0.5rem", right: "0.5rem" } },
        },
        classes: {
          arrows: 'splide__arrows custom-arrows',
          arrow: 'splide__arrow custom-arrow',
          prev: 'splide__arrow--prev custom-prev',
          next: 'splide__arrow--next custom-next',
          pagination: 'splide__pagination custom-pagination',
          page: 'splide__pagination__page custom-page',
        },
      }}
      className="w-full py-4"
    >
      {data.map((property) => (
        <SplideSlide key={property._id}>
          <div 
            className="group relative rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setHoveredId(property._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={property.images?.[0] || "/default-image.webp"}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                priority={false}
              />
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Labels */}
              <div className="absolute top-4 w-full px-4 flex justify-between items-start">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Top Selling
                  </span>
                </span>
                {property.newProperty && (
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      New Launch
                    </span>
                  </span>
                )}
              </div>

              {/* Possession Date at bottom right */}
              {property.possessionDate && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <IoCalendarOutline className="text-base text-purple-400" />
                  <span>Possession: {property.possessionDate}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-1">{property.propertyHeading}</p>

              {/* Property Details */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">₹{formatPrice(property.price)}</span>
                  <span className="text-sm text-gray-500 font-medium">onwards</span>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[0.98]"
                  onClick={() => router.push(`/properties/${(property as any).slug || property._id}`)}
                >
                  View Details
                </button>
                <button
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[0.98]"
                  onClick={() => setSelectedProperty(property.title)}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

          {selectedProperty && (
            <GetInTouchPopup
              propertyTitle={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          )}
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default FeaturedPropertiesSlider;
