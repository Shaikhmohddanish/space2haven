"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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

// ✅ Cache Settings
const CACHE_KEY = "cachedProperties";
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 Day in milliseconds

const CityProjects: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [cityData, setCityData] = useState<CityProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false); // Track screen size

  // 🖼️ Define images from the public/images directory
  const projectImages = [
    "/images/project1.jpeg",
    "/images/project2.jpeg",
    "/images/project3.jpeg",
    "/images/project4.jpeg",
    "/images/project5.jpeg",
  ];

  // ✅ Function to Get Cached Data
  const getCachedData = () => {
    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

    if (cachedData && cachedTimestamp) {
      if (now - parseInt(cachedTimestamp, 10) < CACHE_EXPIRATION_TIME) {
        console.log("✅ Using cached data");
        return JSON.parse(LZString.decompress(cachedData));
      } else {
        console.log("🛑 Cache expired, fetching fresh data...");
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }
    return null;
  };

  useEffect(() => {
    const now = Date.now();

    // ✅ Check for cached data in localStorage
    const cachedData = getCachedData();

    if (cachedData) {
      console.log("✅ Using cached property data");
      setProperties(cachedData);
      processCityData(cachedData);
      setLoading(false);
      return;
    }

    // ✅ Fetch new property data if cache is expired or missing
    const fetchData = async () => {
      try {
        console.log("🔄 Fetching fresh data from API...");
        const response = await axios.get<Property[]>("/api/properties");
        const data = response.data;

        setProperties(data);
        processCityData(data);

        // ✅ Store compressed property data in localStorage
        localStorage.setItem(CACHE_KEY, LZString.compress(JSON.stringify(data)));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Track screen size to prevent hydration mismatch
  useEffect(() => {
    const updateSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    updateSize(); // Set initial value
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ✅ Process City-Based Data from Properties
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
        // 🟢 Assign round-robin image from projectImages array
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
    return <div className="text-center py-10">Loading...</div>;
  }

  // ✅ Dynamically Adjust Number of Tiles
  const tilesToShow = showAll || isLargeScreen ? cityData : cityData.slice(0, 4);

  return (
    <section className="w-full bg-teal-300 bg-cover bg-center px-6 md:px-12 py-4 md:py-6 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex-center gap-4 flex-col mb-4">
          <h1 className="text-3xl font-bold text-black">Choose Your City</h1>
          <hr />
        </div>

        {/* City Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {tilesToShow.map((city, index) => (
            <a
              key={index}
              href={`/properties?search=${city.city.toLowerCase()}`}
              className="relative block rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 bg-white"
              style={{ aspectRatio: "1/1", maxWidth: "250px", margin: "0 auto" }}
            >
              <div className="relative w-full h-full">
                <img src={city.image} alt={city.city} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg font-semibold">{city.city}</h3>
                    <p className="text-sm">{city.count} Projects</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Expand Button - Show only on small screens */}
        {cityData.length > 4 && !isLargeScreen && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="p-2 bg-green-500 rounded-full text-white transition-transform duration-300 hover:bg-green-600 focus:outline-none"
            >
              {showAll ? <IoChevronUp className="text-2xl" /> : <IoChevronDown className="text-2xl" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CityProjects;
