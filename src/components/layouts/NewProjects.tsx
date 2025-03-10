"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Property } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { IoCalendarOutline } from "react-icons/io5";

const NewProjects = ({ data }: { data: Property[] }) => {
  const uniqueData = Array.from(new Map(data.map(property => [property._id, property])).values());
  if (uniqueData.length === 0) {
    return <div className="text-center text-gray-500">No new properties available.</div>;
  }
  return (
    <section className="newProjects px-4 py-6 w-full">
      <div className="container mx-auto">
        
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
            {uniqueData.map((property) => (
            <SplideSlide key={property._id}>
              <div className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:scale-105">
                <a href={`/properties/${property._id}`}>
                  <img
                    src={property.images?.[0] || "/default-image.webp"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                </a>
                {/* Recommended Label - Show only if property.recommend is true */}
              {property.recommend && (
                <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  {"Recommended"}
                </div>
              )}

              {/* New Label - Show only if property.newProperty is true */}
              {property.newProperty && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded">
                  {"New"}
                </div>
              )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{property.propertyHeading}</p>
                  <div className="flex justify-between items-center mb-2">
                    {/* Price */}
                    <p className="text-xl font-bold text-green-600">
                      ₹ {formatPrice(property.price) || "N/A"}
                    </p>
    
                    {/* Possession Date (if available) */}
                    {property.possessionDate && (
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <IoCalendarOutline className="text-orange-soda" />
                        {property.possessionDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default NewProjects;
