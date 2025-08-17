"use client";

import GetInTouchForm from "./GetInTouchForm";
import { PropertiesPageContentProps, Property } from "@/types";
import axios from "axios";
import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import FeaturedPropertiesSlider from "./FeaturedPropertiesSlider";
import NewPropertiesSlider from "./NewPropertiesSlider";
import DeveloperSlider from "./DeveloperSlider";
import { tipsAndGuide } from "@/constants";
import TipsAndGuide from "./TipsAndGuide";
import NewPropertiesGrid from "./NewPropertiesGrid";
import LZString from "lz-string";

// Cache constants
const CACHE_KEY = "cachedProperties";
const CACHE_TIMESTAMP_KEY = `${CACHE_KEY}_timestamp`;
const CACHE_EXPIRATION_TIME = 60 * 1000; // 1 Day in milliseconds

const PropertiesPageContent = ({
  search,
  filters,
  setFilters,
  cachedProperties,
}: PropertiesPageContentProps & { cachedProperties?: Property[] }) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  // State initialization:
  const [data, setData] = useState<Property[]>([]);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [displayedData, setDisplayedData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(!!searchTerm);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);

  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 4 : 6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dataCache = useRef<Property[] | null>(null);

  const getPossessionCategory = (possessionDate: string): string => {
    if (!possessionDate) return "";
    const possessionDateObj = new Date(possessionDate);
    const currentDate = new Date();
    let yearsLeft = possessionDateObj.getFullYear() - currentDate.getFullYear();
    let monthsLeft = (possessionDateObj.getMonth() - currentDate.getMonth()) + (yearsLeft * 12);
    if (monthsLeft <= 0) return "ready";
    if (monthsLeft <= 12) return "1_year";
    if (monthsLeft <= 24) return "2_years";
    if (monthsLeft <= 36) return "3_years";
    return "after_3_years";
  };

  // Fetch Data with localStorage cache
  useEffect(() => {
    const now = Date.now();
    const cachedDataStr = localStorage.getItem(CACHE_KEY);
    const cachedTimestampStr = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (
      cachedDataStr &&
      cachedTimestampStr &&
      now - parseInt(cachedTimestampStr, 10) < CACHE_EXPIRATION_TIME
    ) {
      try {
        const decompressedData = LZString.decompress(cachedDataStr);
        if (decompressedData) {
          const parsedData: Property[] = JSON.parse(decompressedData);
          setData(parsedData);
          dataCache.current = parsedData;
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error parsing cached data:", error);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setShowFullScreenLoader(true);
        const response = await axios.get<Property[]>("/api/properties");
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid API response format");
        }
        setData(response.data);
        dataCache.current = response.data;
        localStorage.setItem(CACHE_KEY, LZString.compress(JSON.stringify(response.data)));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());
      } catch (err) {
        console.error("🚨 Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setShowFullScreenLoader(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [cachedProperties]);

  // Search and Filter Logic
  useEffect(() => {
    setSearchTriggered(!!searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTriggered || !data.length) return;

    let searchData = data;

    if (searchTerm) {
      searchData = searchData.filter((property) =>
        [property.title, property.location, property.address.city, property.address.state, property.developer]
          .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filters
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
      searchData = searchData.filter((property) =>
        getPossessionCategory(property.possessionDate) === filters.possession
      );
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

    if (filters.newProperty) {
      searchData = searchData.filter((property) => property.newProperty === true);
    }

    if (filters.resale) {
      searchData = searchData.filter((property) => property.resale === true);
    }

    if (filters.listingType) {
      searchData = searchData.filter((property) => property.listingType === filters.listingType);
    }

    setFilteredData(searchData);
    setPage(1);
  }, [searchTriggered, searchTerm, filters, data]);

  // Update displayed data based on pagination
  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    setDisplayedData(filteredData.slice(startIndex, startIndex + itemsPerPage));
  }, [filteredData, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Add a ref to the main scrollable container
  const contentTopRef = useRef<HTMLDivElement>(null);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      setTimeout(() => {
        if (contentTopRef.current) {
          contentTopRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 0);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setTimeout(() => {
        if (contentTopRef.current) {
          contentTopRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 0);
    }
  };

  // Memoized property lists
  const featuredProperties = useMemo(() => data.filter((property) => property.featured), [data]);
  const recommendedProperties = useMemo(() => data.filter((property) => property.recommend), [data]);
  const newProperties = useMemo(() => Array.from(new Set(data.filter((property) => property.newProperty))), [data]);

  return (
    <section className="min-h-screen w-full bg-gray-50">
      <div ref={contentTopRef} className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="flex flex-col gap-8">
          {loading && showFullScreenLoader ? (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                <p className="text-gray-600">Loading properties...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              {!searchTriggered ? (
                <>
                  {/* Featured Properties */}
                  {featuredProperties.length > 0 && (
                    <section>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 px-4">Featured Properties</h2>
                      <FeaturedPropertiesSlider data={featuredProperties} />
                    </section>
                  )}

                  {/* Recommended Properties */}
                  {recommendedProperties.length > 0 && (
                    <section>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 px-4">Recommended Properties</h2>
                      <NewPropertiesSlider data={recommendedProperties} />
                    </section>
                  )}

                  {/* New Properties */}
                  {newProperties.length > 0 && (
                    <section>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 px-4">New Properties</h2>
                      <NewPropertiesSlider data={newProperties} />
                    </section>
                  )}

                  {/* Developers Section */}
                  <section className="py-12">
                    <DeveloperSlider />
                  </section>

                  {/* Tips and Guide */}
                  <section className="py-12">
                    <TipsAndGuide data={tipsAndGuide} title="Guides and Calculators" />
                  </section>

                  {/* Contact Form */}
                  <section className="py-12">
                    <GetInTouchForm />
                  </section>
                </>
              ) : (
                <>
                  {/* Search Results */}
                  {filteredData.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="max-w-md mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                        <p className="text-gray-600 mb-6">
                          Try adjusting your search criteria or explore our featured properties below.
                        </p>
                        <button
                          onClick={() => {
                            setSearchTriggered(false);
                          }}
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          View All Properties
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                          {filteredData.length} Properties Found
                        </h2>
                        <p className="text-gray-600">
                          {searchTerm ? `Showing results for "${searchTerm}"` : "Showing all properties"}
                        </p>
                      </div>

                      {/* Properties Grid */}
                      <NewPropertiesGrid data={displayedData} />

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-12">
                          <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className={`
                              w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border text-base font-medium transition-all duration-200
                              ${page === 1
                                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                : "text-gray-700 border-gray-300 hover:bg-gray-50"
                              }
                            `}
                          >
                            Previous
                          </button>

                          <div className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                          </div>

                          <button
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            className={`
                              w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border text-base font-medium transition-all duration-200
                              ${page === totalPages
                                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                : "text-gray-700 border-gray-300 hover:bg-gray-50"
                              }
                            `}
                          >
                            Next
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
      </div>
    </section>
  );
};

export default PropertiesPageContent;
