"use client";

import { useState } from "react";
import { IoCalendarOutline, IoChevronForward, IoChevronBack } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Property } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import GetInTouchPopup from "./GetInTouchPopup";
import { useRouter } from "next/navigation";

// ✅ Custom Next Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
    style={{ zIndex: 10 }}
  >
    <IoChevronForward className="text-orange-soda" size={24} />
  </button>
);

// ✅ Custom Previous Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
    style={{ zIndex: 10 }}
  >
    <IoChevronBack className="text-orange-soda" size={24} />
  </button>
);

const NewPropertiesSlider = ({ data }: { data: Property[] }) => {
  const router = useRouter();

  // 🟢 Ensure Unique Properties
  const uniqueData = Array.from(new Map(data.map((property) => [property._id, property])).values());
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, uniqueData.length), // Dynamically adjust slidesToShow
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, uniqueData.length) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // 🟢 Handle No Data Case
  if (uniqueData.length === 0) {
    return <div className="text-center text-gray-500">No new properties available.</div>;
  }

  return (
    <div
      className={`relative my-6 ${
        uniqueData.length === 1 ? "lg:w-[33%] w-full" : uniqueData.length === 2 ? "lg:w-[66%] w-full" : "w-full"
      }`}
    >
      <Slider {...sliderSettings}>
        {uniqueData.map((property) => (
          <div key={property._id} className="px-2">
            <div className="lightGray shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={property.images?.[0] || "/default-image.webp"}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />

                {/* Recommended Label */}
                {property.recommend && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                    {"Recommended"}
                  </div>
                )}

                {/* New Label */}
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
                {/* Property Title */}
                <h2 className="text-lg font-semibold mb-1 truncate">{property.title}</h2>

                {/* Property Heading */}
                <h3 className="text-sm text-gray-600 mb-2 truncate">{property.propertyHeading}</h3>

                {/* Price & Possession Date */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-bold text-green-600">
                    ₹ {formatPrice(property.price) || "N/A"}
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
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedProperty(property.title);
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Show Popup only when a property is selected */}
      {selectedProperty && (
        <GetInTouchPopup propertyTitle={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </div>
  );
};

export default NewPropertiesSlider;
