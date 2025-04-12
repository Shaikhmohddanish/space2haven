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
      title: "Property Rates & Price Trends",
      description: "Market rates, analytics & transaction data",
      imageSrc: "/images/rates-trend.png",
      bgColor: "bg-yellow-100",
      cta: "Explore Now →",
    },
    {
      title: "Property Rates Heatmap",
      description: "Understand city prices with visual maps",
      imageSrc: "/images/heatmap.png",
      bgColor: "bg-green-100",
      cta: "Explore Now →",
    },
    {
      title: "Valuation Report",
      description: "Instant PDF valuation of any property",
      imageSrc: "/images/valuation.png",
      bgColor: "bg-pink-100",
      cta: "Explore Now →",
    },
    {
      title: "Project Reviews & Ratings",
      description: "See what residents say about areas",
      imageSrc: "/images/reviews.png",
      bgColor: "bg-orange-100",
      cta: "Explore Now →",
    },
  ],
  business: [
    {
      title: "Interactive 3D Solutions",
      description: "Digital twins & immersive experiences",
      imageSrc: "/images/3d-solutions.png",
      bgColor: "bg-purple-100",
      cta: "Explore Now →",
    },
    {
      title: "Channel Partner Platform",
      description: "India’s #1 platform for brokers",
      imageSrc: "/images/partner-app.png",
      bgColor: "bg-rose-100",
      cta: "Get The Free App →",
    },
    {
      title: "Data Intelligence",
      description: "Accurate, deep real estate analytics",
      imageSrc: "/images/data-intel.png",
      bgColor: "bg-blue-100",
      cta: "Book a Demo →",
    },
    {
      title: "Home Loan Platform",
      description: "Loan disbursals with top partner banks",
      imageSrc: "/images/cred-iq.png",
      bgColor: "bg-indigo-100",
      cta: "Get a Demo →",
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
