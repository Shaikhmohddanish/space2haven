"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import PropertyCard from "../PropertyCard";
import { Skeleton } from "../ui/skeleton";
import { DynamicCarouselProps, Property } from "@/types";
import { usePathname } from "next/navigation";
import { SquareArrowOutUpRight } from "lucide-react";

const DynamicCarousel = ({ type, data, loading }: DynamicCarouselProps) => {
    const pathname = usePathname();
    const plugin = useRef(Autoplay({ delay: 2000}));
    
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className={`basis-full md:basis-1/2 lg:basis-1/3 ${pathname === "/" && "xl:basis-1/4"}`}
                        >
                            <Skeleton className="h-[300px] md:h-[350px] lg:h-[400px] max-w-sm rounded-xl" />
                        </CarouselItem>
                    ))
                    : type === "home-properties" && Array.isArray(data) && (data as Property[]).length > 0
                    ? (data as Property[]).slice(0, 6).map((property) => (
                        <CarouselItem
                          key={property._id}
                          className={`basis-full md:basis-1/2 lg:basis-1/3 ${pathname === "/" && "xl:basis-1/4"}`}
                        >
                          <PropertyCard
                            id={property._id}
                            imageSrc={property.images?.[0] || "/images/default-image.webp"}
                            price={property.price}
                            features={property.features || ""}
                            configuration={property.configuration}
                            tag={property.propertyType}
                            location={property.location}
                          />
                        </CarouselItem>
                      ))
                  
                        : (data as string[]).map((img, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                                <div className="property-card-styles">
                                    <Image
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                                        loading='eager'
                                        src={img}
                                        alt={`Interior Design ${index + 1}`}
                                        className="rounded-lg object-cover"
                                        fill
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                {/* "More" link for properties */}
                {data.length > 5 && (
                    <CarouselItem className="basis-2/3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="flex-center h-full w-full text-center rounded-lg overflow-hidden shadow-lg border bg-sand-soft">
                            <Link
                                href={type === "home-properties" ? "/properties" : "/interior"}
                                className="hover:text-red-600 flex items-center gap-2 scale-100 hover:scale-110 transition duration-500"
                            >
                                {type === "home-properties" ? "More" : "Visit"}
                                {type === "home-properties" ? <ArrowRightIcon /> : <SquareArrowOutUpRight size={15} />}
                            </Link>
                        </div>
                    </CarouselItem>
                )}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default DynamicCarousel;
