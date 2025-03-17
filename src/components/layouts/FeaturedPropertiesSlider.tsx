"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRouter } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import GetInTouchPopup from "./GetInTouchPopup";

interface FeaturedPropertiesSliderProps {
  data: Property[];
}

const FeaturedPropertiesSlider = ({ data }: FeaturedPropertiesSliderProps) => {
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  return (
    <Splide
      options={{
        perPage: 3,
        gap: "1rem",
        arrows: true,
        pagination: false,
        padding: "1rem",
        breakpoints: {
          1024: { perPage: 2, gap: "0.75rem" },
          768: { perPage: 2, gap: "0.5rem" },
          480: { perPage: 1, gap: "0.5rem", padding: "0.5rem" },
        },
      }}
      className="w-full"
    >
      {data.map((property) => (
        <SplideSlide key={property._id}>
          <div className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:scale-105 cursor-pointer">
            <div className="relative">
              <a href={`/properties/${property._id}`}>
                <img
                  src={property.images?.[0] || "/default-image.webp"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
              </a>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded">
                {"Top Selling Project"}
              </div>
              {property.newProperty && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-700 text-white text-xs px-2 py-1 rounded">
                  {"New"}
                </div>
              )}

              {/* ✅ Constant "View Details" Button at the Bottom Center */}
              <button
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-md hover:bg-black/80 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/properties/${property._id}`);
                }}
              >
                View Details
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1 truncate">{property.title}</h2>
              <h3 className="text-sm text-gray-600 mb-2 truncate">{property.propertyHeading}</h3>

              {/* Price & Possession Date */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-green-600">
                  ₹ {formatPrice(property.price) || "N/A"} On Wards
                </p>
                {property.possessionDate && (
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <IoCalendarOutline className="text-orange-soda" />
                    {property.possessionDate}
                  </p>
                )}
              </div>

              {/* Transparent Get in Touch Button */}
              <button
                className="w-full border border-green-600 text-green-600 py-2 rounded-md font-medium hover:bg-green-600 hover:text-white transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProperty(property.title);
                }}
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Show Popup if selected */}
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
