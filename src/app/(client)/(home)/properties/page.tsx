"use client";

import { Suspense, useEffect, useState } from "react";
import { LoaderLayout, PropertiesPageContent } from "@/components";
import { FilterObject } from "@/types";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import PropertyDetails from "./[id]/PropertyDetails"; // ✅ Import Property Details Component
import LZString from "lz-string"; // ✅ Import compression library

const HalfBanner = dynamic(() => import("@/components/layouts/HalfBanner"), { ssr: false });

export interface Configuration {
  bhkType: string;
  carpetArea: string;
  builtupArea: string;
  carpetAreaUnit: string;
  builtupAreaUnit: string;
  price: string;
}

interface Property {
  _id: string;
  title: string;
  images: string[];
  price: string;
  propertyType: string;
  configuration: string[];
  configurations: Configuration[];
  description: string;
  overview: string;
  location: string;
  area: string;
  areaUnit: string;
  yearBuilt: number;
  features: string[];
  possession: string;
  possessionDate: string;
  developer: string;
  featured: boolean;
  newProperty: boolean;
  address: {
    city: string;
    state: string;
  };
  updatedAt: string;
}

// ✅ Cache Constants
const CACHE_KEY = "cachedProperties";
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 Day in milliseconds

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

const PropertiesPage = () => {
  const params = useParams();
  const pathname = usePathname();

  // ✅ Extract Property ID from URL
  const propertyId = params?.id || pathname.split("/").pop();
  const isValidPropertyId = propertyId && propertyId.length === 24;

  // ✅ State for Search & Filters
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<FilterObject>({
    city: "",
    state: "",
    budget: { min: "", max: "" },
    propertyType: [],
    configuration: [],
    developer: "",
    possession: "",
  });

  // ✅ State for Property Details Page
  const [property, setProperty] = useState<Property | null>(null);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Check Cache First Before Fetching from API
  useEffect(() => {
    if (!isValidPropertyId) return;

    const fetchProperty = async () => {
      setLoading(true);
      console.log("🔍 Checking cache for property:", propertyId);

      try {
        // ✅ Try retrieving the full properties list from cache
        const cachedData: Property[] = getCachedData();
        
        if (cachedData) {
          const cachedProperty = cachedData.find((p) => p._id === propertyId);
            if (cachedProperty) {
              console.log("✅ Property found in cache:", cachedProperty);
              setProperty(cachedProperty);
              setLoading(false);
              return; // Exit early since we found it in cache
            }
        }

        // ✅ If not found in cache, fetch from API (DO NOT UPDATE CACHE)
        console.log("🔄 Property not in cache, fetching from API...");
        const response = await axios.get(`/api/properties?id=${propertyId}`);

        if (!response.data.matchingData) {
          throw new Error("Property not found.");
        }

        console.log("🏡 Property Data from API:", response.data);
        setProperty(response.data.matchingData);
        setRecommended(response.data.recommendedData || []);
      } catch (err) {
        console.error("❌ Error fetching property:", err);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, isValidPropertyId]);

  // ✅ If on `/properties/[id]`, show **Property Details** instead of Grid
  if (isValidPropertyId) {
    if (loading) return <LoaderLayout />;
    if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        {property ? (
          <PropertyDetails property={property} recommended={recommended} />
        ) : (
          <p className="text-xl font-semibold text-gray-600">
            Property not found.
          </p>
        )}
      </div>
    );
  }

  // ✅ Otherwise, show the **Property Listings Grid**
  return (
    <>
      <Suspense fallback={<LoaderLayout />}>
        <HalfBanner search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
        <PropertiesPageContent search={search} filters={filters} setFilters={setFilters} />
      </Suspense>
    </>
  );
};

export default PropertiesPage;
