"use client";

import { DisplayProperties, LoaderLayout, DynamicCarousel, GetInTouchForm } from "@/components";
import { PropertiesPageContentProps, Property } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FeaturedPropertiesSlider from "./FeaturedPropertiesSlider";
import NewPropertiesSlider from "./NewPropertiesSlider";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const PropertiesPageContent = ({
  search,
  filters,
  setFilters,
  cachedProperties,
}: PropertiesPageContentProps & { cachedProperties?: Property[] }) => {
  const pathname = usePathname();
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

  const itemsPerPage = 4;

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
          setFilteredData(response.data);
        } catch (err) {
          console.error("🚨 Error fetching properties:", err);
          setError("Failed to load properties. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setFilteredData(cachedProperties);
    }
  }, [cachedProperties]);

  // ✅ Apply Filters and Search
  useEffect(() => {
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
  }, [search, filters, data]);

  // ✅ Update displayed data when filteredData or page changes
  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, page]);

  // ✅ Pagination Controls
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // ✅ Filter Featured, Recommended, and New Properties
  const featuredProperties = data.filter((property) => property.featured);
  const recommendedProperties = data.filter((property) => property.recommend);
  const newProperties = Array.from(new Set(data.filter((property) => property.newProperty)));

  return (
    <section className="min-h-screen w-full flex justify-center items-start flex-col md:flex-row px-4 md:px-10 bg-[url(/images/pattern.png)]">
      <main className="flex flex-col w-full h-full p-4 md:p-6 gap-4">
        {/* ✅ Show Sliders Only If Search is Empty */}
        {!search && (
          <>
            {featuredProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 text-home">Featured Properties</h1>
                <FeaturedPropertiesSlider data={featuredProperties as Property[]} />
              </div>
            )}
  
            {recommendedProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 text-home">Recommended Properties</h1>
                <NewPropertiesSlider data={recommendedProperties as Property[]} />
              </div>
            )}
  
            {newProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 text-home">New Properties</h1>
                <NewPropertiesSlider data={newProperties as Property[]} />
              </div>
            )}
            <GetInTouchForm/>
          </>
        )}
  
        {/* Show pagination and properties if search has value */}
        {search && (
          <>
            {/* Show heading only if properties are found */}
            {filteredData.length > 0 ? (
              <>
                <h1 className="text-2xl font-semibold text-center my-4 text-home">
                  Discover Your Dream Property with Us
                </h1>
  
                {loading ? (
                  <LoaderLayout />
                ) : (
                  <>
                    <DisplayProperties data={displayedData} />
  
                    {/* ✅ Pagination Controls */}
                    <div className="flex justify-center items-center my-6 gap-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-full border ${
                          page === 1
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-gray-700 border-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <IoChevronBack />
                      </button>
  
                      <span className="text-gray-600">
                        Page {page} of {totalPages}
                      </span>
  
                      <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className={`px-4 py-2 rounded-full border ${
                          page === totalPages
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-gray-700 border-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <IoChevronForward />
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              // Show "No properties found" if search is active but no results
              <h1 className="text-2xl font-semibold text-center my-4 text-home">
                No properties found. Please try a different search.
                </h1>
            )}
          </>
        )}
      </main>
    </section>
  );
  
};

export default PropertiesPageContent;
