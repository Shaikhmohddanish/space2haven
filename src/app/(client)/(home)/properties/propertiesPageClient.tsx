"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { LoaderLayout, PropertiesPageContent } from "@/components";
import { FilterObject } from "@/types";
import dynamic from "next/dynamic";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import PropertyDetails from "./[id]/PropertyDetails";
import LZString from "lz-string";

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
  propertyHeading: string;
  recommend: boolean;
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
  perSqftRate: string;
  features: string[];
  possession: string;
  possessionDate: string;
  developer: string;
  featured: boolean;
  newProperty: boolean;
  resale: boolean;
  listingType: string;
  address: {
    city: string;
    state: string;
  };
  updatedAt: string;
}

const CACHE_KEY = "cachedProperties";
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

const getCachedData = () => {
  const now = Date.now();
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

  if (cachedData && cachedTimestamp) {
    if (now - parseInt(cachedTimestamp, 10) < CACHE_EXPIRATION_TIME) {
      try {
        const decompressed = LZString.decompress(cachedData);
        return decompressed ? JSON.parse(decompressed) : null;
      } catch {
        return null;
      }
    } else {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(`${CACHE_KEY}_timestamp`);
    }
  }
  return null;
};

export default function PropertiesPageClient() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryId = searchParams.get("id");
  const lastSegment = pathname.split("/").pop();
  const propertyKey = (params as any)?.id || queryId || (lastSegment !== "properties" ? lastSegment : undefined);
  const isDetailRoute = Boolean(propertyKey);

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

  const [property, setProperty] = useState<Property | null>(null);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const detailCacheRef = useRef<Record<string, Property | undefined>>({});

  useEffect(() => {
    if (!isDetailRoute || !propertyKey) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const cachedData: Property[] = getCachedData();

        if (cachedData) {
          const recommendedProperties: Property[] = cachedData?.filter((p) => p.recommend) || [];
          const cachedProperty = cachedData?.find((p) => p._id === propertyKey || (p as any).slug === propertyKey);
          if (cachedProperty) {
            setProperty(cachedProperty);
            setRecommended(recommendedProperties || []);
            setLoading(false);
            return;
          }
        }

        if (detailCacheRef.current[propertyKey as string]) {
          setProperty(detailCacheRef.current[propertyKey as string] || null);
          setRecommended([]);
          setLoading(false);
          return;
        }

        const isObjectId = typeof propertyKey === "string" && propertyKey.length === 24;
        const response = await axios.get(
          isObjectId ? `/api/properties?id=${propertyKey}` : `/api/properties?slug=${propertyKey}`
        );

        if (!response.data.matchingData) {
          throw new Error("Property not found.");
        }

        setProperty(response.data.matchingData);
        setRecommended(response.data.recommendedData || []);
        detailCacheRef.current[propertyKey as string] = response.data.matchingData;
      } catch (err) {
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyKey, isDetailRoute]);

  if (isDetailRoute) {
    if (loading) return <LoaderLayout />;
    if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        {property ? (
          <PropertyDetails property={property} recommended={recommended} />
        ) : (
          <p className="text-xl font-semibold text-gray-600">Property not found.</p>
        )}
      </div>
    );
  }

  return (
    <>
      <HalfBanner search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
      <PropertiesPageContent search={search} filters={filters} setFilters={setFilters} />
    </>
  );
}


