import { useState, useEffect } from "react";
import { Property } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable"; // 🟢 Import useSwipeable

interface FeaturedPropertiesSliderProps {
  data: Property[];
}

const formatPrice = (price: string) => {
  const priceNumber = parseFloat(price.replace(/,/g, ""));
  if (isNaN(priceNumber)) return "N/A";

  if (priceNumber >= 1_00_00_000) {
    return `${(priceNumber / 1_00_00_000).toFixed(2)} Cr`;
  } else if (priceNumber >= 1_00_000) {
    return `${(priceNumber / 1_00_000).toFixed(2)} Lakh`;
  } else {
    return `${priceNumber.toLocaleString()} Rupees`;
  }
};

const FeaturedPropertiesSlider = ({ data }: FeaturedPropertiesSliderProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // 🟢 Dynamically set items per page based on screen width
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    if (currentIndex < data.length - itemsPerPage) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // 🟢 Handle Swipe Gestures
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true, // Optional: enables swipe on desktop with mouse drag
  });

  return (
    <div className="relative w-full my-6" {...handlers}>
      {/* Carousel Wrapper */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {data.map((property) => (
            <div
              key={property._id}
              className="min-w-full sm:min-w-[calc(100%/2)] md:min-w-[calc(100%/3)] p-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/properties/${property._id}`)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group">
                <Image
                  src={property.images?.[0] || "/default-image.webp"}
                  alt={property.title}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1 truncate">{property.title}</h2>
                  <p className="text-sm text-gray-500 mb-2 truncate">{property.location}</p>
                  <p className="text-xl font-bold text-home mb-2">₹ {formatPrice(property.price) || "N/A"}</p>
                  <div className="flex items-center justify-between text-gray-600 text-sm">
                    <p className="truncate">{property.configuration.join(", ")}</p>
                    <p className="truncate">{property.propertyType}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition shadow-md ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        disabled={currentIndex >= data.length - itemsPerPage}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition shadow-md ${
          currentIndex >= data.length - itemsPerPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FeaturedPropertiesSlider;
