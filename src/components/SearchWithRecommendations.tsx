"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";

interface Property {
  _id: string;
  title: string;
  location: string;
  address: { city: string; state: string };
  price: string;
  propertyType: string;
  configuration: string;
  images: string[];
}

const SearchWithRecommendations = ({ page }: { page: "home" | "properties" | "interior" }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🟢 Fetch properties based on search input
  const fetchProperties = useCallback(
    debounce(async (searchValue: string) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/properties?query=${searchValue}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // 🟢 Handle search input change
  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      fetchProperties(value);
    } else {
      setSuggestions([]);
    }
  };

  // 🟢 Redirect to property details page when selecting a suggestion
  const handleSelectProperty = (propertyId: string) => {
    setQuery("");
    router.push(`/properties/${propertyId}`);
  };

  // 🟢 Redirect to properties page with search query
  const handleSearchRedirect = () => {
    if (query.trim()) {
      router.push(`/properties?search=${query}`);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mt-6">
      {/* ✅ Show Search Bar on Home and Properties Pages */}
      {(page === "home" || page === "properties") && (
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md bg-white">
          <input
            type="text"
            placeholder="Search by title, location, city, or state..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 h-12 px-4 text-gray-700 border-none focus:ring-0 focus:outline-none"
          />
          <button
            onClick={handleSearchRedirect}
            className="h-12 w-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* ✅ Suggestions Dropdown (Only on Home Page) */}
      {page === "home" && query.length > 1 && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-2 max-h-64 overflow-auto border border-gray-200">
          {loading ? (
            <div className="text-center text-blue-500 p-3">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((property) => (
              <div
                key={property._id}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectProperty(property._id)}
              >
                <img
                  src={property.images?.[0] || "/default-image.webp"}
                  alt={property.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <p className="text-sm font-semibold">{property.title}</p>
                  <p className="text-xs text-gray-500">
                    {property.location}, {property.address.city}, {property.address.state}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-red-500 p-3">No matching properties found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithRecommendations;
