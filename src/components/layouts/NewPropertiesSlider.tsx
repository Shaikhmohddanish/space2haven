import { IoLocationOutline, IoBedOutline, IoCalendarOutline, IoChevronForward, IoChevronBack } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Property } from "@/types";

// ✅ Price Formatter Function
const formatPrice = (price: string) => {
  const priceNumber = parseFloat(price.replace(/,/g, ''));
  if (isNaN(priceNumber)) return "N/A";

  if (priceNumber >= 1_00_00_000) {
    return `${(priceNumber / 1_00_00_000).toFixed(2)} Cr`;
  } else if (priceNumber >= 1_00_000) {
    return `${(priceNumber / 1_00_000).toFixed(2)} Lakh`;
  } else {
    return `${priceNumber.toLocaleString()} Rupees`;
  }
};

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
    <div className="relative w-full my-6">
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
                  <div className="absolute top-4 right-4 bg-orange-soda text-white text-xs px-2 py-1 rounded">
                    {property.propertyType}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 truncate">{property.title}</h2>
                  <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                    <IoLocationOutline className="text-orange-soda" />
                    {property.location}, {property.address.city}, {property.address.state}
                  </p>
                  <p className="text-xl font-bold text-home mb-2">
                    ₹ {formatPrice(property.price) || "N/A"}
                  </p>
                  <ul className="flex items-center text-gray-600 text-sm gap-4 mb-4">
                    <li className="flex items-center gap-1">
                      <IoBedOutline className="text-orange-soda" />
                      {property.configuration.join(", ")}
                    </li>
                    <li className="flex items-center gap-1">
                      <IoCalendarOutline className="text-orange-soda" />
                      {property.possession}
                    </li>
                  </ul>
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
