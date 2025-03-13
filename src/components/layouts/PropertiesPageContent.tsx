"use client";

import { GetInTouchForm } from "@/components";
import { PropertiesPageContentProps, Property } from "@/types";
import axios from "axios";
import { useEffect, useState, useMemo, useRef } from "react";
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
  const searchTerm = searchParams.get("search") || "";

  if (isPropertyDetailsPage) return null;

  const [data, setData] = useState<Property[]>(cachedProperties || []);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [displayedData, setDisplayedData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(!cachedProperties?.length);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(!!searchTerm);

  const itemsPerPage = 4;
  const dataCache = useRef<Property[] | null>(null); // ✅ Cache API response

  // ✅ Fetch Data only once if Not Cached
  useEffect(() => {
    if (!cachedProperties && !dataCache.current) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get("/api/properties");
          if (!Array.isArray(response.data)) throw new Error("Invalid API response format");
          setData(response.data);
          dataCache.current = response.data; // ✅ Cache API response
        } catch (err) {
          console.error("🚨 Error fetching properties:", err);
          setError("Failed to load properties. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (cachedProperties) {
      setData(cachedProperties);
      dataCache.current = cachedProperties;
    }
  }, [cachedProperties]);

  // ✅ Trigger search only when there's a search term
  useEffect(() => {
    setSearchTriggered(!!searchTerm);
  }, [searchTerm]);

  // ✅ Apply Filters and Search only when searchTriggered is true
  useEffect(() => {
    if (!searchTriggered || !data.length) return;

    let searchData = data;

    if (searchTerm) {
      searchData = searchData.filter((property) =>
        [property.title, property.location, property.address.city, property.address.state, property.developer]
          .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.configuration.length) {
      searchData = searchData.filter((property) =>
        property.configuration.some((bhk) => filters.configuration.includes(bhk))
      );
    }

    if (filters.propertyType.length) {
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
  }, [searchTriggered, searchTerm, filters, data]);

  // ✅ Memoized paginated data
  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    setDisplayedData(filteredData.slice(startIndex, startIndex + itemsPerPage));
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      
      // Ensure state updates before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // Small delay to allow UI updates first
    }
  };
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
  
      // Ensure state updates before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };
  

  // ✅ Memoized featured/recommended/new properties
  const featuredProperties = useMemo(() => data.filter((property) => property.featured), [data]);
  const recommendedProperties = useMemo(() => data.filter((property) => property.recommend), [data]);
  const newProperties = useMemo(() => Array.from(new Set(data.filter((property) => property.newProperty))), [data]);

  return (
    <section className="min-h-screen w-full flex justify-center items-start flex-col md:flex-row px-4 md:px-10">
      <main className="flex flex-col w-full h-full p-4 md:p-6 gap-4">
      {loading ? (
  <div className="text-center text-gray-600">Loading properties...</div>
) : error ? (
  <div className="text-center text-red-500">{error}</div>
) : (
  <>
    {/* ✅ Show when no search is triggered */}
    {!searchTriggered ? (
      <>
        {featuredProperties.length > 0 && (
          <div className="w-full my-6">
            <h1 className="text-2xl font-semibold mb-4 darkBrown">Featured Properties</h1>
            <FeaturedPropertiesSlider data={featuredProperties} />
          </div>
        )}

        {recommendedProperties.length > 0 && (
          <div className="w-full my-6">
            <h1 className="text-2xl font-semibold mb-4 darkBrown">Recommended Properties</h1>
            <NewPropertiesSlider data={recommendedProperties} />
          </div>
        )}

        {newProperties.length > 0 && (
          <div className="w-full my-6">
            <h1 className="text-2xl font-semibold mb-4 darkBrown">New Properties</h1>
            <NewPropertiesSlider data={newProperties} />
          </div>
        )}

        <DeveloperSlider />
        <div className="my-8">
          <TipsAndGuide data={tipsAndGuide} title="Guides and Calculators" />
        </div>
        <GetInTouchForm />
      </>
    ) : (
      <>
        {/* ✅ No results found message */}
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-8">
            No properties found. Try adjusting your search filters.
          </div>
        ) : (
          <>
            {/* ✅ Display search results */}
            <h2 className="text-xl font-semibold text-center mb-4 darkBrown">
              {filteredData.length} results - Flats, Apartments for sale in {searchTerm}
            </h2>
            <h1 className="text-2xl font-semibold text-center darkBrown">
              Discover Your Dream Property with Us
            </h1>
            <NewPropertiesGrid data={displayedData} />

            {/* ✅ Pagination Controls */}
            {totalPages > 1 && (
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
            )}
          </>
        )}
      </>
    )}
  </>
)}

      </main>
    </section>
  );
};

export default PropertiesPageContent;
