"use client";

import { useState, useEffect } from "react";
import { FaSearchPlus, FaSearchMinus, FaPlay, FaPause, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/interiorDesigns/1.jpg",
  "/interiorDesigns/2.jpg",
  "/interiorDesigns/3.jpg",
];

export default function AdvancedImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle Next/Prev Navigation
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Handle Zoom
  const toggleZoom = () => setIsZoomed(!isZoomed);

  // Handle Slideshow
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(handleNext, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-6xl mx-auto my-4 flex flex-col md:flex-row gap-6 items-center">
      
      {/* Main Image View */}
      <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={`w-full h-full object-contain transition-all duration-500 ease-in-out ${
            isZoomed ? "scale-125" : "scale-100"
          }`}
        />

        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={toggleZoom}
            className="p-3 bg-white shadow-md text-black rounded-full hover:bg-gray-200 transition"
          >
            {isZoomed ? <FaSearchMinus size={20} /> : <FaSearchPlus size={20} />}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-white shadow-md text-black rounded-full hover:bg-gray-200 transition"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black p-4 rounded-full hover:bg-gray-200 transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black p-4 rounded-full hover:bg-gray-200 transition"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="w-full md:w-1/5 hidden md:flex flex-col gap-3">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className={`w-full h-20 object-cover cursor-pointer border-2 rounded-lg transition ${
              currentIndex === index ? "border-pink-500" : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
