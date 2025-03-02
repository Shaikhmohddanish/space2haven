"use client";

import { Suspense, useEffect, useState } from "react";
import { HalfBanner, LoaderLayout, PropertiesPageContent } from "@/components";
import { FilterObject } from "@/types";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import PropertyDetails from "./[id]/PropertyDetails"; // ✅ Import Property Details Component

interface Property {
  _id: string;
  title: string;
  images: string[];
  price: string;
  propertyType: string;
  configuration: string[];
  description: string;
  location: string;
  area: string;
  yearBuilt: number;
  features: string[];
  possession: string; // ✅ ADDED THIS FIELD
  developer: string;
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
    bhk: "",
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
      <div className="max-w-6xl mx-auto p-6">
        {property ? (
          <PropertyDetails property={property} recommended={recommended} />
        ) : (
          <p className="text-center text-gray-500">Property not found.</p>
        )}
      </div>
    );
  }

  // ✅ Otherwise, show the **Property Listings Grid**
  return (
    <>
      <HalfBanner search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
      <Suspense fallback={<section className="min-h-screen w-full flex-center"><LoaderLayout /></section>}>
        <PropertiesPageContent search={search} filters={filters} setFilters={setFilters} />
      </Suspense>
    </>
  );
};

export default PropertiesPage;
