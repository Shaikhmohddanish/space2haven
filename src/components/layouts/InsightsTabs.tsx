'use client';

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TABS = ["For Customers", "For Business"];

const insightsData = {
  customers: [
    {
      title: "Buy or Rent Property",
      description:
        "Discover the best properties to buy or rent with verified listings & expert assistance.",
      imageSrc: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      bgColor: "bg-yellow-50",
      cta: "Explore Now",
    },
    {
      title: "Sell or Rent Your Property",
      description:
        "Get personalized help to sell or rent your property quickly through our expert team.",
      imageSrc: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
      bgColor: "bg-green-50",
      cta: "Explore Now",
    },
    {
      title: "Interior Design",
      description:
        "Transform your space with expert-designed interiors tailored to your style & budget.",
      imageSrc: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      bgColor: "bg-pink-50",
      cta: "Explore Now",
    },
  ],
  business: [
    {
      title: "Sales & Marketing Support",
      description:
        "We help real estate developers and channel partners grow with expert sales and marketing support.",
      imageSrc: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      bgColor: "bg-purple-50",
      cta: "Explore Now",
    },
    {
      title: "Interior Design",
      description:
        "Transforming spaces with personalized, functional, and aesthetic design solutions.",
      imageSrc: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      bgColor: "bg-rose-50",
      cta: "Explore Now",
    },
    {
      title: "Videography",
      description:
        "High-quality video production that captures your brand's story and elevates your presence.",
      imageSrc: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
      bgColor: "bg-blue-50",
      cta: "Explore Now",
    },
  ],
};

const InsightsTabs = () => {
  const [activeTab, setActiveTab] = useState("For Customers");

  const currentData =
    activeTab === "For Customers" ? insightsData.customers : insightsData.business;

  return (
    <section className="w-full px-4 py-12 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Insights & Tools
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-10 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`pb-3 text-lg font-medium relative transition-all duration-300 ${
                activeTab === tab
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-purple-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform transition-transform duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Slider */}
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="pb-12"
        >
          {currentData.map((item, index) => (
            <SwiperSlide key={index}>
              <div 
                className={`rounded-xl shadow-lg p-6 h-full flex flex-col justify-between transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.bgColor}`}
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="my-6 relative overflow-hidden rounded-lg h-56 group">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/default-image.webp";
                    }}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <button 
                  className="inline-flex items-center text-purple-600 font-medium group hover:text-purple-700 transition-colors duration-300"
                >
                  <span>{item.cta}</span>
                  <svg
                    className="w-5 h-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InsightsTabs;
