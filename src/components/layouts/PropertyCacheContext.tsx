"use client";

import React, { createContext, useState, useEffect } from "react";
import LZString from "lz-string";
import axios from "axios";
import { Property } from "./CityProjects";

const CACHE_KEY = "cachedProperties";
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 Day

export const PropertyCacheContext = createContext<any>(null);

export const PropertyCacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

    // ✅ Check for cache expiration and validity
    if (!cachedTimestamp || isNaN(parseInt(cachedTimestamp, 10))) {
      console.warn("⚠️ Invalid cache timestamp detected, clearing cache...");
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(`${CACHE_KEY}_timestamp`);
    }

    if (cachedData && cachedTimestamp && now - parseInt(cachedTimestamp, 10) < CACHE_EXPIRATION_TIME) {
      try {
        console.log("✅ Using cached properties");
        const decompressedData = LZString.decompress(cachedData);
        if (decompressedData) {
          setProperties(JSON.parse(decompressedData));
        } else {
          console.warn("⚠️ Cache decompression failed, fetching fresh data...");
        }
        setLoading(false);
        return;
      } catch (error) {
        console.error("❌ Error parsing cached data:", error);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }

    // ✅ Fetch new property data if cache is expired or missing
    const fetchData = async () => {
      const controller = new AbortController(); // ✅ Prevent memory leaks
      const signal = controller.signal;

      try {
        console.log("🔄 Fetching fresh properties...");
        const response = await axios.get<Property[]>("/api/properties", { signal });
        setProperties(response.data);

        // ✅ Store compressed data in cache
        localStorage.setItem(CACHE_KEY, LZString.compress(JSON.stringify(response.data)));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn("🚫 API request canceled:", error.message);
        } else {
          console.error("❌ Error fetching properties:", error);
        }
      } finally {
        setLoading(false);
      }

      // Cleanup function to cancel API request if the component unmounts
      return () => controller.abort();
    };

    fetchData();
  }, []);

  return (
    <PropertyCacheContext.Provider value={{ properties, loading }}>
      {children}
    </PropertyCacheContext.Provider>
  );
};
