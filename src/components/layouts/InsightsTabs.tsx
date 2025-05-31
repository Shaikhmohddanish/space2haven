'use client';

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TABS = ["For Customers", "For Business"];

const insightsData = {
  customers: [
    {
      title: "Buy or Rent Property",
      description:
        "Discover the best properties to buy or rent with verified listings & expert assistance.",
      imageSrc: "/images/buy-rent.png", // Make sure to provide these images in your project
      bgColor: "bg-yellow-100",
      cta: "Explore Now →",
    },
    {
      title: "Sell or Rent Your Property",
      description:
        "Get personalized help to sell or rent your property quickly through our expert team.",
      imageSrc: "/images/sell-rent.png",
      bgColor: "bg-green-100",
      cta: "Explore Now →",
    },
    {
      title: "Interior Design",
      description:
        "Transform your space with expert-designed interiors tailored to your style & budget.",
      imageSrc: "/images/interior-design.png",
      bgColor: "bg-pink-100",
      cta: "Explore Now →",
    },
  ],
  business: [
    {
      title: "Sales & Marketing Support",
      description:
        "We help real estate developers and channel partners grow with expert sales and marketing support.",
      imageSrc: "/images/sales-marketing.png",
      bgColor: "bg-purple-100",
      cta: "Explore Now →",
    },
    {
      title: "Interior Design",
      description:
        "Transforming spaces with personalized, functional, and aesthetic design solutions.",
      imageSrc: "/images/interior-design.png",
      bgColor: "bg-rose-100",
      cta: "Explore Now →",
    },
    {
      title: "Videography",
      description:
        "High-quality video production that captures your brand’s story and elevates your presence.",
      imageSrc: "/images/videography.png",
      bgColor: "bg-blue-100",
      cta: "Explore Now →",
    },
  ],
};


const InsightsTabs = () => {
  const [activeTab, setActiveTab] = useState("For Customers");

  const currentData =
    activeTab === "For Customers" ? insightsData.customers : insightsData.business;

  return (
    <section className="w-full px-4 py-8 md:px-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">Insights & Tools</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-8 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-lg font-medium ${
              activeTab === tab
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {currentData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={`rounded-xl shadow-md p-4 h-full flex flex-col justify-between ${item.bgColor}`}>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
              <img
                src={item.imageSrc}
                alt={item.title}
                className="rounded-lg w-full h-32 object-contain my-4"
              />
              <button className="text-purple-700 font-medium text-sm hover:underline">
                {item.cta}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default InsightsTabs;
