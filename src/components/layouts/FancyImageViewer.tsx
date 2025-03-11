"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom, Thumbnails, Slideshow, Fullscreen } from "yet-another-react-lightbox/plugins";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  { src: "/interiorDesigns/1.jpg", id: "image1" },
  { src: "/interiorDesigns/2.jpg", id: "image2" },
  { src: "/interiorDesigns/3.jpg", id: "image3" },
];

export default function FancyImageViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Next Image
  const handleNext = () => setPhotoIndex((prev) => (prev + 1) % images.length);

  // Previous Image
  const handlePrev = () => setPhotoIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full max-w-6xl mx-auto my-4 flex flex-col md:flex-row gap-6 items-center relative">
      
      {/* Main Image (Click to Open Lightbox) */}
      <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={images[photoIndex].src}
          alt={`Image ${photoIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer rounded-lg shadow-lg"
          onClick={() => setIsOpen(true)}
        />

        {/* 🔹 Updated Button Positioning & Visibility */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition duration-300 shadow-lg backdrop-blur-md z-50"
        >
          <FaChevronLeft size={22} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition duration-300 shadow-lg backdrop-blur-md z-50"
        >
          <FaChevronRight size={22} />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="w-full md:w-1/5 hidden md:flex flex-col gap-3">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={`Thumbnail ${index + 1}`}
            className={`w-full h-20 object-cover cursor-pointer border-2 rounded-lg transition ${
              photoIndex === index ? "border-pink-500" : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setPhotoIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox Viewer */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images.map((image) => ({ src: image.src, key: image.id }))}
          index={photoIndex}
          on={{ view: ({ index }) => setPhotoIndex(index) }}
          plugins={[Zoom, Thumbnails, Slideshow, Fullscreen]}
          carousel={{ finite: false }}
          render={{
            buttonPrev: () => (
              <button
                key="prev-btn"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition duration-300 shadow-lg backdrop-blur-md z-50"
              >
                <FaChevronLeft size={22} />
              </button>
            ),
            buttonNext: () => (
              <button
                key="next-btn"
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition duration-300 shadow-lg backdrop-blur-md z-50"
              >
                <FaChevronRight size={22} />
              </button>
            ),
            buttonClose: () => (
              <button
                key="close-btn"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition duration-300 shadow-lg backdrop-blur-md z-50"
              >
                <FaTimes size={22} />
              </button>
            ),
          }}
        />
      )}
    </div>
  );
}
