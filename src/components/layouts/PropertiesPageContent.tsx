"use client";

import { DisplayProperties, LoaderLayout, DynamicCarousel, GetInTouchForm, Services } from "@/components";
import { PropertiesPageContentProps, Property } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import FeaturedPropertiesSlider from "./FeaturedPropertiesSlider";
import NewPropertiesSlider from "./NewPropertiesSlider";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import DeveloperSlider from "./DeveloperSlider";
import { tipsAndGuide } from "@/constants";
import TipsAndGuide from "./TipsAndGuide";
import NewPropertiesGrid from "./NewPropertiesGrid";

const PropertiesPageContent = ({
  search,
  filters,
  setFilters,
  cachedProperties,
}: PropertiesPageContentProps & { cachedProperties?: Property[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPropertyDetailsPage = pathname.startsWith("/properties/");

  if (isPropertyDetailsPage) {
    return null;
  }

  const [data, setData] = useState<Property[]>(cachedProperties || []);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [displayedData, setDisplayedData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(!cachedProperties?.length);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const itemsPerPage = 4;

  useEffect(() => {
    if (searchParams.get("search")) {
      setSearchTriggered(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearchTriggered(false); // ✅ Restore default state when no search query
    }
  }, [searchParams]);
  

  // ✅ Fetch Data if Not Cached
  useEffect(() => {
    if (!cachedProperties || cachedProperties.length === 0) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get("/api/properties");

          if (!Array.isArray(response.data)) {
            throw new Error("Invalid API response format");
          }

          setData(response.data);
        } catch (err) {
          console.error("🚨 Error fetching properties:", err);
          setError("Failed to load properties. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [cachedProperties]);

  // ✅ Apply Filters and Search only when searchTriggered is true
  useEffect(() => {
    if (!searchTriggered || data.length === 0) return;

    let searchData = [...data];

    if (search) {
      searchData = searchData.filter((property) =>
        [property.title, property.location, property.address.city, property.address.state, property.developer]
          .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (filters.configuration.length > 0) {
      searchData = searchData.filter((property) =>
        property.configuration.some((bhk) => filters.configuration.includes(bhk))
      );
    }

    if (filters.propertyType.length > 0) {
      searchData = searchData.filter((property) =>
        filters.propertyType.includes(property.propertyType)
      );
    }

    if (filters.possession) {
      searchData = searchData.filter((property) => property.possession === filters.possession);
    }

    if (filters.developer) {
      searchData = searchData.filter((property) => property.developer === filters.developer);
    }

    if (filters.budget.min) {
      searchData = searchData.filter(
        (property) => parseInt(property.price.replace(/\D/g, ""), 10) >= parseInt(filters.budget.min)
      );
    }

    if (filters.budget.max) {
      searchData = searchData.filter(
        (property) => parseInt(property.price.replace(/\D/g, ""), 10) <= parseInt(filters.budget.max)
      );
    }

    setFilteredData(searchData);
    setPage(1);
  }, [searchTriggered, search, filters, data]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // ✅ Small delay ensures scrolling happens AFTER UI updates
    }
  };
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    const searchTermFromURL = searchParams.get("search") || "";
    if (searchTermFromURL) {
      setSearchTriggered(true);
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchTermFromURL, // ✅ Ensure search persists after refresh
      }));
    }
  }, [searchParams]);
  
  

  // ✅ Restore missing variables
  const featuredProperties = data.filter((property) => property.featured);
  const recommendedProperties = data.filter((property) => property.recommend);
  const newProperties = Array.from(new Set(data.filter((property) => property.newProperty)));
  const totalResults = filteredData.length;
  const searchTerm = searchParams.get("search") || ""; // Extract search term
  return (
    
    <section className="min-h-screen w-full flex justify-center items-start flex-col md:flex-row px-4 md:px-10">
      <main className="flex flex-col w-full h-full p-4 md:p-6 gap-4">
        {/* ✅ Show Sliders Only If Search is Not Triggered */}
        {!searchTriggered && (
          <>
            {featuredProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 darkBrown">Featured Properties</h1>
                <FeaturedPropertiesSlider data={featuredProperties as Property[]} />
              </div>
            )}

            {recommendedProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 darkBrown">Recommended Properties</h1>
                <NewPropertiesSlider data={recommendedProperties as Property[]} />
              </div>
            )}

            {newProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 darkBrown">New Properties</h1>
                <NewPropertiesSlider data={newProperties as Property[]} />
              </div>
            )}

            <DeveloperSlider />
            <div className="my-8">
              <TipsAndGuide data={tipsAndGuide} title="Guides and Calculators" />
            </div>
            <GetInTouchForm />
          </>
        )}

        {/* ✅ Show properties only after search is triggered */}
        {searchTriggered && totalResults > 0 && (
          <>
          <h2 className="text-xl font-semibold text-center mb-4 darkBrown">
            {totalResults} results - Flats, Apartments for sale in {searchTerm}
          </h2>

          <h1 className="text-2xl font-semibold text-center darkBrown">
                  Discover Your Dream Property with Us
                </h1>
            <NewPropertiesGrid data={displayedData as Property[]} />

            <div className="flex justify-center items-center my-6 gap-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-4 py-2 rounded-full border ${
                  page === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-gray-700 border-gray-500 hover:bg-gray-100"
                }`}
              >
                <IoChevronBack />
              </button>

              <span className="text-gray-600">Page {page} of {totalPages}</span>

              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-full border ${
                  page === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-gray-700 border-gray-500 hover:bg-gray-100"
                }`}
              >
                <IoChevronForward />
              </button>
            </div>
          </>
        )}


        {/* ✅ No properties found message */}
        {searchTriggered && totalResults === 0 && (
          <h1 className="text-2xl font-semibold text-center my-4 darkBrown">
            No properties found. Please try a different search.
          </h1>
        )}
      </main>
    </section>
  );
};

export default PropertiesPageContent;
