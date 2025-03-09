"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, Filter } from "lucide-react"; // 🟢 Import Filter Icon
import DialogBox from "./DialogBox";
import { FilterProps, Property } from "@/types";
import debounce from "lodash.debounce";
import { createPortal } from "react-dom";

const HalfBanner = ({
  search,
  setSearch,
  setFilters,
  filters,
}: { search: string; setSearch: (value: string) => void } & FilterProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync search from URL
  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);

  // Fetch suggestions based on input
  const fetchSuggestions = useCallback(
    debounce(async (searchValue: string) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/properties?query=${searchValue}`);
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Handle search input
  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSelectProperty = (propertyId: string) => {
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
    router.push(`/properties/${propertyId}`);
  };

  // Handle search button click
  const handleSearchRedirect = () => {
    if (search.trim()) {
      setShowSuggestions(false);
      router.push(`/properties?search=${search}`);
    }
  };

  return (
    <section className="h-[50vh] w-full bg-[url('/images/propertyBanner.webp')] bg-cover bg-center flex-center relative">
      <div className="bg-black/40 flex flex-col items-center justify-center h-full px-4 text-sand-soft w-full relative z-10">
        <div className="w-full mb-6 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            Find Your Perfect Space
          </h1>
          <p className="text-gray-200">
            Browse through our exclusive listings to find your next home.
          </p>
        </div>

        {/* Search Bar */}
        <div id="search-bar" className="relative w-full max-w-lg mx-auto">
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md bg-white relative z-20">
            <input
              type="text"
              placeholder="Search by Locality, Project, or Developer..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[70%] h-12 px-2 text-gray-700 border-none focus:ring-0 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="w-[15%] h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 border-l border-gray-300"
            >
              <Filter className="h-5 w-5" /> {/* 🟢 Excel-like Filter Icon */}
            </button>
            <button
              type="button"
              onClick={handleSearchRedirect}
              className="w-[15%] h-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white border-l border-gray-300"
            >
              <SearchIcon />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {isClient && showSuggestions && search.length > 1 && createPortal(
            <div
              className="absolute z-30 bg-white shadow-lg rounded-lg mt-1 max-h-80 overflow-y-auto border border-gray-200"
              style={{
                position: "absolute",
                top: (() => {
                  const searchBar = document.getElementById("search-bar");
                  if (searchBar) {
                    const rect = searchBar.getBoundingClientRect();
                    return rect.bottom + window.scrollY + "px";
                  }
                  return "0px";
                })(),
                left: (() => {
                  const searchBar = document.getElementById("search-bar");
                  if (searchBar) {
                    const rect = searchBar.getBoundingClientRect();
                    return rect.left + "px";
                  }
                  return "0px";
                })(),
                width: (() => {
                  const searchBar = document.getElementById("search-bar");
                  if (searchBar) {
                    const rect = searchBar.getBoundingClientRect();
                    return rect.width + "px";
                  }
                  return "100%";
                })(),
              }}
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-gray-500 hover:text-red-500 transition duration-200"
                >
                  ✕
                </button>
              </div>
              {loading ? (
                <div className="text-center text-blue-500 p-3">Loading...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((property) => (
                  <div
                    key={property._id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => handleSelectProperty(property._id)}
                  >
                    <img
                      src={property.images?.[0] || "/default-image.webp"}
                      alt={property.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold truncate">{property.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {property.location}, {property.address.city}, {property.address.state}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-red-500 p-3">
                  No matching properties found.
                </div>
              )}
            </div>,
            document.body
          )}
        </div>
      </div>
    </section>
  );
};

export default HalfBanner;
