"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "../../app/styles/slider.css";
import { useRouter } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import GetInTouchPopup from "./GetInTouchPopup";
import Image from "next/image";

interface NewPropertiesSliderProps {
  data: Property[];
}

const NewPropertiesSlider = ({ data }: NewPropertiesSliderProps) => {
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState<{ title: string, id: string } | null>(null);

  const handleGetInTouch = (property: Property) => {
    setSelectedProperty({ title: property.title, id: property._id });
  };

  const handleClosePopup = () => {
    setSelectedProperty(null);
  };

  const MemoizedSlideCard = React.memo(function MemoizedSlideCard({ property, onDetails, onGetInTouch }: { property: Property, onDetails: () => void, onGetInTouch: () => void }) {
    return (
      <div className="property-card rounded-xl overflow-hidden bg-white shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={property.images?.[0] || "/default-image.webp"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="property-image w-full h-full object-cover"
            loading="lazy"
            priority={false}
          />
          {/* Possession Date at bottom right */}
          {property.possessionDate && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <IoCalendarOutline className="text-base text-purple-400" />
              <span>Possession: {property.possessionDate}</span>
            </div>
          )}
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          {/* Labels */}
          <div className="absolute top-4 w-full px-4 flex justify-between items-start">
            {property.newProperty && (
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  New Launch
                </span>
              </span>
            )}
            {property.featured && (
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  Featured
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h2>
            <p className="text-gray-600 line-clamp-2">{property.propertyHeading}</p>
          </div>

          {/* Property Details */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">₹{formatPrice(property.price)}</span>
              <span className="text-sm text-gray-500 font-medium">onwards</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[0.98]"
              onClick={onDetails}
            >
              View Details
            </button>
            <button
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[0.98]"
              onClick={onGetInTouch}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Splide
        options={{
          perPage: 3,
          gap: "2rem",
          arrows: false,
          pagination: true,
          padding: { left: "1rem", right: "1rem" },
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          speed: 700,
          rewind: true,
          rewindByDrag: true,
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
            <MemoizedSlideCard
              property={property}
              onDetails={() => router.push(`/properties/${(property as any).slug || property._id}`)}
              onGetInTouch={() => handleGetInTouch(property)}
            />
          </SplideSlide>
        ))}
      </Splide>
      {selectedProperty && (
        <GetInTouchPopup
          propertyTitle={selectedProperty.title}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default NewPropertiesSlider;
