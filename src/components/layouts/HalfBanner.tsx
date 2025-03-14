"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import DialogBox from "./DialogBox";
import { FilterProps, Property } from "@/types";
import debounce from "lodash.debounce";
import { PropertyCacheContext } from "@/components/layouts/PropertyCacheContext";

const HalfBanner = ({
  search,
  setSearch,
  setFilters,
  filters,
}: { search: string; setSearch: (value: string) => void } & FilterProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();
  
  const { properties } = useContext(PropertyCacheContext); // ✅ Access cached properties globally

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);

  // ✅ Fetch Suggestions (Debounced) - Uses Cached Data First
const fetchSuggestions = useCallback(
  debounce(async (searchValue: string) => {
    if (!searchValue.trim()) return;

    setLoading(true);
    setShowSuggestions(true);

    try {
      if (properties.length > 0) {
        console.log("✅ Using cached properties from context");

        // ✅ Filter properties locally for suggestions
        const suggestionsSet = new Set<string>();
        properties.forEach((property: Property) => {
          const values = [property.title, property.developer, property.location, property.address?.city];
          values.forEach((value) => {
            if (value && value.toLowerCase().includes(searchValue.toLowerCase())) {
              suggestionsSet.add(value);
            }
          });
        });

        // ✅ Convert Set to Array & Prioritize Exact Matches First
        let suggestionsArray = Array.from(suggestionsSet);

        suggestionsArray.sort((a, b) => {
          const lowerQuery = searchValue.toLowerCase();
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();

          // ✅ Exact matches first
          if (aLower === lowerQuery) return -1;
          if (bLower === lowerQuery) return 1;

          // ✅ Titles that start with query come before ones that contain it
          if (aLower.startsWith(lowerQuery) && !bLower.startsWith(lowerQuery)) return -1;
          if (bLower.startsWith(lowerQuery) && !aLower.startsWith(lowerQuery)) return 1;

          // ✅ Otherwise, maintain natural order
          return 0;
        });

        if (suggestionsArray.length > 0) {
          setSuggestions(suggestionsArray);
          setLoading(false);
          return;
        }
      }

      // ✅ If no cached results, hit the API
      console.log("🔄 No cached results, hitting API...");
      const response = await fetch(`/api/suggestions?query=${encodeURIComponent(searchValue)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data.suggestions?.length ? data.suggestions : []);
    } catch (error) {
      console.error("❌ Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 500),
  [properties] // ✅ Dependency array to prevent stale cache usage
);


  // ✅ Handle input change (Triggers Suggestions but NOT Properties)
  const handleSearch = (value: string) => {
    setSearch(value);
    setIsSearchTriggered(false);

    if (value.length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // ✅ When clicking a suggestion, set it in search box but do not trigger properties
  const handleSelectSuggestion = (value: string) => {
    setSearch(value);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // ✅ Redirect to search results page
  const handleSearchRedirect = () => {
    setShowFullScreenLoader(true); // ✅ Show full-screen loader
    setShowSuggestions(false);

    setTimeout(() => {
        setIsSearchTriggered(true);
        setShowFullScreenLoader(false); // ✅ Hide loader after 1 second

        if (!search.trim()) {
            // ✅ If search is empty, remove query param and redirect to /properties
            router.push("/properties");
        } else {
            // ✅ Otherwise, search normally with the entered query
            router.push(`/properties?search=${encodeURIComponent(search)}`);
        }
    }, 1000);
};

  return (
    <>
      {/* ✅ Full-Screen Loader Overlay */}
      {showFullScreenLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      <section className="h-[50vh] w-full bg-[url('/images/propertyBanner.webp')] bg-cover bg-center flex-center relative">
        <div className="bg-black/40 flex flex-col items-center justify-center h-full px-4 text-sand-soft w-full relative z-10">
          
          {/* Heading */}
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
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white relative z-20">
              <input
                type="text"
                placeholder="Search by Locality, Project, or Developer..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-[70%] h-12 px-2 text-black border-none focus:ring-0 focus:outline-none"
              />
              <DialogBox
                type="filter"
                filters={filters}
                setFilters={setFilters}
                className="w-[15%] h-12 flex items-center justify-center border-l bg-white"
              />
              <button
                type="button"
                onClick={handleSearchRedirect}
                className="w-[15%] h-12 flex items-center justify-center bg-white text-black border-l border-gray-300"
              >
                <SearchIcon />
              </button>
            </div>

            {/* ✅ Suggestions Dropdown (While Typing) */}
            {showSuggestions && search.length > 1 && (
              <div className="absolute z-30 bg-white shadow-lg rounded-lg mt-1 max-h-80 overflow-y-auto border border-gray-200 w-full">
                
                {/* Close Button */}
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => setShowSuggestions(false)}
                    className="text-gray-500 hover:text-red-500 transition duration-200"
                  >
                    ✕
                  </button>
                </div>

                {/* ✅ Show "Loading..." while fetching */}
                {loading ? (
                  <div className="text-center text-blue-500 p-3">Loading...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((match, index) => (
                    <div
                      key={index}
                      className="p-3 text-black hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleSelectSuggestion(match)}
                    >
                      {match}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-red-500 p-3">
                    No matching results found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HalfBanner;
