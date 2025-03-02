"use client";

import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const DisplayCarousel = ({ images }: { images: Array<string> }) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Image Slider */}
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="w-full cursor-pointer"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden"
              onClick={() => setLightboxIndex(index)} // Open Lightbox
            >
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="eager"
                src={image}
                alt={`Property Image ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Fullscreen Lightbox (Gallery View) */}
      {lightboxIndex !== null && (
        <Lightbox
          slides={images.map((img) => ({ src: img }))}
          open={lightboxIndex !== null}
          index={lightboxIndex}
          close={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};

export default DisplayCarousel;
