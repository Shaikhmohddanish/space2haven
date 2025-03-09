"use client";

import { Suspense, useEffect, useState } from "react";
import { LoaderLayout, PropertiesPageContent } from "@/components";
import { FilterObject } from "@/types";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import PropertyDetails from "./[id]/PropertyDetails"; // ✅ Import Property Details Component

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
  configurations: Configuration[];  // ✅ New: For detailed configurations
  description: string;
  location: string;
  area: string;
  areaUnit:string;
  yearBuilt: number;
  features: string[];
  possession: string; // ✅ ADDED THIS FIELD
  developer: string;
  featured: boolean;
  newProperty: boolean;
  url:string;
  address: {
    city: string;
    state: string;
  };
  updatedAt: string;
}


const PropertiesPage = () => {
  const params = useParams();
  const pathname = usePathname();

  // ✅ Extract Property ID from URL
  const propertyId = params?.id || pathname.split("/").pop(); // Use either method

  // ✅ Validate `propertyId` - It must be 24 characters (MongoDB ObjectId)
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
    possession: ""
  });

  // ✅ State for Property Details Page
  const [property, setProperty] = useState<Property | null>(null);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch property details only if `propertyId` is valid
  useEffect(() => {
    if (!isValidPropertyId) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching property details for:", propertyId);

        const response = await axios.get(`/api/properties?id=${propertyId}`);

        if (!response.data.matchingData) {
          throw new Error("Property not found.");
        }

        console.log("🏡 Property Data:", response.data);
        // ✅ Ensure possession exists in the mapped data
        const propertyData = {
          ...response.data.matchingData,
          possession: response.data.matchingData.possession || "N/A", // ✅ Fallback if missing
          developer : response.data.matchingData.developer || "N/A",
        };

        setProperty(response.data.matchingData);
        setRecommended(response.data.recommendedData || []);
      } catch (error) {
        console.error("❌ Error fetching property:", error);
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
      <div className="items-center justify-center min-h-screen">
        {property ? (
          <PropertyDetails property={property} recommended={recommended} />
        ) : (
          <p className="text-center text-gray-500 text-xl">Property not found.</p>
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
