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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Property[]>("/api/properties");
        const data = response.data;

        // Group properties by city and count them
        const cityMap = new Map<string, { count: number; image: string }>();

        data.forEach((property) => {
          const city = property.address.city || "Unknown";
          if (cityMap.has(city)) {
            cityMap.set(city, {
              count: cityMap.get(city)!.count + 1,
              image: cityMap.get(city)!.image || property.images[0] || "",
            });
          } else {
            cityMap.set(city, {
              count: 1,
              image: property.images[0] || "",
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
    <section className="w-full bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-gray-600">Choose</span> <span className="text-black">Your City</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cityData.map((city, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="flex items-center">
                <img
                  src={city.image}
                  alt={city.city}
                  className="w-20 h-20 object-cover rounded-l-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{city.city}</h3>
                  <a
                    href={`/properties/${city.city.toLowerCase()}`}
                    className="text-blue-500 hover:underline"
                  >
                    {city.count} Projects
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityProjects;
