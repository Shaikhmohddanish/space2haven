"use client";

import { useState, useContext, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Search as SearchIcon } from "lucide-react";
import debounce from "lodash.debounce";
import { PropertyCacheContext } from "@/components/layouts/PropertyCacheContext";
import { Property } from "./layouts/CityProjects";

const SearchWithRecommendationsComponent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();
  
  const { properties } = useContext(PropertyCacheContext); // ✅ Access cached properties globally

  const [search, setSearch] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
  const [searchBarPosition, setSearchBarPosition] = useState({ top: 0, left: 0, width: 0 });

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
    setShowFullScreenLoader(true);
    setShowSuggestions(false);

    setTimeout(() => {
      setIsSearchTriggered(true);
      setShowFullScreenLoader(false);

      if (!search.trim()) {
        router.push("/properties");
      } else {
        router.push(`/properties?search=${encodeURIComponent(search)}`);
      }
    }, 1000);
  };

  // ✅ Position Update Effect
  useEffect(() => {
    const updatePosition = () => {
      const searchBar = document.getElementById("search-bar");
      if (searchBar) {
        const rect = searchBar.getBoundingClientRect();
        setSearchBarPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [search]);

  return (
    <>
      {/* ✅ Full-Screen Loader Overlay */}
      {showFullScreenLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Search Bar */}
      <div id="search-bar" className="w-[90%] relative max-w-lg mx-auto">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white relative z-20">
          <input
            type="text"
            placeholder="Search by Locality, Project, or Developer..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-[85%] h-12 px-2 text-black border-none focus:ring-0 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSearchRedirect}
            className="w-[15%] h-12 flex items-center justify-center bg-white text-black border-l border-gray-300"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* ✅ Suggestions Dropdown (Using createPortal) */}
      {showSuggestions && search.length > 1 &&
        createPortal(
          <div
            className="absolute z-50 bg-white shadow-lg rounded-lg border border-gray-200 max-h-80 overflow-y-auto"
            style={{
              position: "absolute",
              top: searchBarPosition.top + "px",
              left: searchBarPosition.left + "px",
              width: searchBarPosition.width + "px",
            }}
          >
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
              <div className="text-center text-red-500 p-3">No matching results found.</div>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

// ✅ Wrap inside Suspense to fix the Next.js 15 issue
const SearchWithRecommendations = () => (
  <Suspense fallback={<div className="text-center">Loading Search...</div>}>
    <SearchWithRecommendationsComponent />
  </Suspense>
);

export default SearchWithRecommendations;
