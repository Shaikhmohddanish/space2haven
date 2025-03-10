import { IoCalendarOutline, IoChevronForward, IoChevronBack } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Property } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { Home, MapPin } from "lucide-react";


// ✅ Custom Next Button
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
    style={{ zIndex: 10 }}
  >
    <IoChevronForward className="text-orange-soda" size={24} />
  </button>
);

// ✅ Custom Previous Button
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
  // 🟢 Ensure Unique Properties
  const uniqueData = Array.from(new Map(data.map(property => [property._id, property])).values());

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, uniqueData.length), // Dynamically adjust slidesToShow
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, uniqueData.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(1, uniqueData.length),
        },
      },
    ],
  };

  // 🟢 Handle No Data Case
  if (uniqueData.length === 0) {
    return <div className="text-center text-gray-500">No new properties available.</div>;
  }

  return (
    <div
  className={`relative my-6 ${
    uniqueData.length === 1
      ? "lg:w-[33%] w-full"
      : uniqueData.length === 2
      ? "lg:w-[66%] w-full"
      : "w-full"
  }`}
>
  <Slider {...sliderSettings}>
    {uniqueData.map((property) => (
      <div key={property._id} className="px-2">
        <a href={`/properties/${property._id}`} className="block">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={property.images?.[0] || "/default-image.webp"}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />

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
            </div>
            <div className="p-4">
              {/* Property Title */}
              <h2 className="text-lg font-semibold mb-1 truncate">{property.title}</h2>

              {/* Property Heading */}
              <h3 className="text-sm text-gray-600 mb-2 truncate">{property.propertyHeading}</h3>

              {/* Price and Possession Date on the Same Line */}
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
        </a>
      </div>
    ))}
  </Slider>
</div>
  );
};

export default NewPropertiesSlider;
