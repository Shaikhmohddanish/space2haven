"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images: string[] = Array.from({ length: 3 }, (_, i) => `/interiorDesigns/${i + 1}.jpg`);

export default function ImageSlider() {
  return (
    <>
    <section className="w-full lightgray bg-cover bg-center px-6 md:px-12 py-4 md:py-6 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex-center gap-4 flex-col mb-4">
            <h1 className="text-2xl font-bold text-black">Interiors for Every Budget</h1>
            <p className="text-black text-lg md:text-xl text-center">
            Let’s design your dream spaces with style and efficiency.
            </p>
            <hr/>
        </div>
        </div>
    </section>
    <div className="relative w-full h-auto lightgray">
        <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            pagination={false}
            className="w-full h-auto hide-on-custom-buttons" // 🔥 Hides default blue arrows
        >
            {images.map((src, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <img
                            src={src}
                            alt={`Interior ${index + 1}`}
                            className="w-full h-full object-cover" />

                        {/* "Get In Touch" Button - Always Visible & Clickable */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                            <button
                                onClick={() => alert('Button Clicked!')} // ✅ Ensure button works
                                className="bg-black text-white px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300"
                            >
                                Get In Touch
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Navigation Buttons - No More Blue Arrows */}
        <button className="custom-swiper-button-prev absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300">
            <FaChevronLeft className="text-white text-lg md:text-xl" />
        </button>
        <button className="custom-swiper-button-next absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300">
            <FaChevronRight className="text-white text-lg md:text-xl" />
        </button>
    </div>
    </>
  );
}
