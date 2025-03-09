"use client";

import React from "react";
import { Property } from "@/types";
import { MapPin, Home } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRouter } from "next/navigation";

interface FeaturedPropertiesSliderProps {
  data: Property[];
}

const FeaturedPropertiesSlider = ({ data }: FeaturedPropertiesSliderProps) => {
  const router = useRouter();

  return (
    <Splide
      options={{
        perPage: 3,
        gap: "1rem",
        arrows: true,
        pagination: false,
        padding: "1rem",
        breakpoints: {
          1024: {
            perPage: 2,
            gap: "0.75rem",
          },
          768: {
            perPage: 2,
            gap: "0.5rem",
          },
          480: {
            perPage: 1,
            gap: "0.5rem",
            padding: "0.5rem",
          },
        },
      }}
      className="w-full"
    >
      {data.map((property, index) => (
        <SplideSlide key={index}>
          <div
            className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:scale-105 cursor-pointer"
            onClick={() => router.push(`/properties/${property._id}`)}
          >
            <a href={`/properties/${property._id}`}>
              <img
                src={property.images?.[0] || "/default-image.webp"}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
            </a>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {property.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                <MapPin className="text-orange-soda" size={16} />
                {property.address.city}, {property.address.state}
              </p>
              <p className="text-xl font-bold text-green-600 mb-2">
                {property.price === "Price on request"
                  ? "Price on request"
                  : `₹ ${formatPrice(property.price)}`}
              </p>

              {/* Additional Info */}
              <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
                <p className="flex items-center gap-1">
                  <Home className="text-orange-soda" size={16} />
                  {property.configuration
                    .map((config) => config.split(" ")[0])
                    .join(", ")}{" "}
                  BHK {" " + property.propertyType}
                </p>
              </div>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default FeaturedPropertiesSlider;
