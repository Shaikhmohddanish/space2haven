"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import LZString from "lz-string";

export interface Property {
  _id?: string;
  title: string;
  images: string[];
  address: {
    city: string;
    state: string;
  };
  price: string;
  propertyType: string;
  configurations: {
    bhkType: string;
    carpetArea: string;
    carpetAreaUnit: string;
    builtupArea: string;
    builtupAreaUnit: string;
    price: string;
  }[];
  description: string;
  location: string;
  area: string;
  areaUnit: string;
  yearBuilt: number;
  features?: string[];
  recommend: boolean;
  possession: string;
  possessionDate: string;
  developer: string;
  url?: string;
  featured: boolean;
  newProperty: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CityProjects {
  city: string;
  count: number;
  image: string;
}

const CACHE_KEY = "cachedProperties";
const CACHE_EXPIRATION_TIME = 60 * 1000; // 1 Day in milliseconds

const projectImages = [
  "/images/project1.jpeg",
  "/images/project2.jpeg",
  "/images/project3.jpeg",
  "/images/project4.jpeg",
  "/images/project5.jpeg",
];

const CityProjects: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [cityData, setCityData] = useState<CityProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const getCachedData = () => {
    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

    if (cachedData && cachedTimestamp) {
      if (now - parseInt(cachedTimestamp, 10) < CACHE_EXPIRATION_TIME) {
        return JSON.parse(LZString.decompress(cachedData));
      } else {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }
    return null;
  };

  useEffect(() => {
    const now = Date.now();
    const cachedData = getCachedData();

    if (cachedData) {
      setProperties(cachedData);
      processCityData(cachedData);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get<Property[]>("/api/properties");
        const data = response.data;

        setProperties(data);
        processCityData(data);
        localStorage.setItem(CACHE_KEY, LZString.compress(JSON.stringify(data)));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const processCityData = (data: Property[]) => {
    const cityMap = new Map<string, { count: number; image: string }>();

    data.forEach((property, index) => {
      const city = property.address.city || "Unknown";
      if (cityMap.has(city)) {
        cityMap.set(city, {
          count: cityMap.get(city)!.count + 1,
          image: cityMap.get(city)!.image || property.images[0] || "",
        });
      } else {
        const imageIndex = index % projectImages.length;
        cityMap.set(city, {
          count: 1,
          image: projectImages[imageIndex],
        });
      }
    });

    setCityData(Array.from(cityMap, ([city, { count, image }]) => ({ city, count, image })));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const tilesToShow = showAll || isLargeScreen ? cityData : cityData.slice(0, 4);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your City
          </h2>
          <p className="text-lg text-gray-600">
            Explore properties across prime locations
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {tilesToShow.map((city, index) => (
            <Link
              key={index}
              href={`/properties?search=${city.city.toLowerCase()}`}
              className="group relative block"
              onMouseEnter={() => setHoveredCity(city.city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <div className="relative h-[250px] w-full overflow-hidden rounded-2xl">
                {/* Background Image */}
                <Image
                  src={city.image}
                  alt={city.city}
                  fill
                  className={`
                    object-cover transition-transform duration-700
                    ${hoveredCity === city.city ? 'scale-110' : 'scale-100'}
                  `}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                    {/* City Name */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {city.city}
                    </h3>

                    {/* Projects Count */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-sm text-white">
                        {city.count} Projects
                      </span>
                    </div>
                  </div>

                  {/* Explore Button */}
                  <div className={`
                    mt-4 transform transition-all duration-300
                    ${hoveredCity === city.city ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}>
                    <button className="inline-flex items-center gap-2 text-sm text-white">
                      <span>View Projects</span>
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        {cityData.length > 4 && !isLargeScreen && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium transition-all duration-200"
            >
              <span>{showAll ? 'Show Less' : 'Show More'}</span>
              {showAll ? (
                <IoChevronUp className="text-xl" />
              ) : (
                <IoChevronDown className="text-xl" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CityProjects;
