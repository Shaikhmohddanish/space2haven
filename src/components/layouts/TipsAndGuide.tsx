'use client';

import { ServiceSectionProps } from "@/types";
import ServiceCard from "./ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const TipsAndGuide = ({
  title,
  data,
  subtitle,
  bgClassName = "bg-gradient-to-b from-home to-gray-800"
}: ServiceSectionProps) => {
  return (
    <section className="w-full bg-gray-100 px-6 md:px-12 py-6">
      <div className="relative z-10 flex flex-col items-center gap-0 w-full">
        {/* Header */}
        <div className="flex-center gap-2 flex-col mb-6">
          <h1 className={`header-class text-black`}>{title}</h1>
          <hr className="darkBrown" />
        </div>

        {/* Swiper Slider */}
        <div className="w-full max-w-7xl mx-auto">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 }, // Show 2 on medium and above
              480: { slidesPerView: 2},
            }}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {data.map((service, index) => (
              <SwiperSlide key={index}>
                <ServiceCard
                  imageSrc={service.imageSrc}
                  title={service.title}
                  url={service.url}
                  className="flex flex-col items-center justify-center rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 p-4"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TipsAndGuide;
