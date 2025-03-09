"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Property {
  title: string;
  address: {
    city: string;
    state: string;
  };
  images: string[];
}

interface CityProjects {
  city: string;
  count: number;
  image: string;
}

const CityProjects: React.FC = () => {
  const [cityData, setCityData] = useState<CityProjects[]>([]);
  const [loading, setLoading] = useState(true);

  // 🖼️ Define images from the public/images directory
  const projectImages = [
    "/images/project1.jpeg",
    "/images/project2.jpeg",
    "/images/project3.jpeg",
    "/images/project4.jpeg",
    "/images/project5.jpeg",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Property[]>("/api/properties");
        const data = response.data;

        // Group properties by city and count them
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

        const cityProjectsData = Array.from(cityMap, ([city, { count, image }]) => ({
          city,
          count,
          image,
        }));

        setCityData(cityProjectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
<section
      className="w-full bg-[url(/images/pattern.png)] bg-teal-300 bg-cover bg-center px-6 md:px-12 py-4 md:py-6 relative z-10"
    >      <div className="container mx-auto px-4">
        {/* Header */}
      <div className="flex-center gap-4 flex-col mb-4">
        <h1 className={`header-class text-black`}>Choose Your City</h1>
        <hr className={`bg-black`} />
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cityData.map((city, index) => (
            <a
              key={index}
              href={`/properties?search=${city.city.toLowerCase()}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={city.image}
                  alt={city.city}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg font-semibold">{city.city}</h3>
                    <p className="text-sm">{city.count} Projects</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityProjects;
