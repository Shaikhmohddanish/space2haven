"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import FilterProperties from "@/components/layouts/FilterProperties";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const [filters, setFilters] = useState({
    bhk: "",
    budget: { min: "", max: "" },
    propertyType: [],
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // 🟢 Fetch properties based on search & filters
  const fetchProperties = useCallback(
    debounce(async (searchValue) => {
      setLoading(true);

      let apiUrl = `/api/properties?query=${searchValue}`;
      if (filters.bhk) apiUrl += `&bhk=${filters.bhk}`;
      if (filters.budget.min) apiUrl += `&minPrice=${filters.budget.min}`;
      if (filters.budget.max) apiUrl += `&maxPrice=${filters.budget.max}`;
      if (filters.propertyType.length > 0) apiUrl += `&propertyType=${filters.propertyType.join(",")}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [filters]
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

  // 🟢 Redirect to properties page with filters in URL
  const handleSearchRedirect = () => {
    let searchUrl = `/properties?search=${query}`;
    if (filters.bhk) searchUrl += `&bhk=${filters.bhk}`;
    if (filters.budget.min) searchUrl += `&minPrice=${filters.budget.min}`;
    if (filters.budget.max) searchUrl += `&maxPrice=${filters.budget.max}`;
    if (filters.propertyType.length > 0) searchUrl += `&propertyType=${filters.propertyType.join(",")}`;

    router.push(searchUrl);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mt-6">
      {/* ✅ Show Search Bar only on Home Page (Remove Filter on Home) */}
      {page === "home" && (
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md bg-white">
          <input
            type="text"
            placeholder="Search by title, location, city, or state..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 h-12 px-4 text-gray-700 border-none focus:ring-0 focus:outline-none"
          />

          {/* ✅ Search Button */}
          <button
            onClick={handleSearchRedirect}
            className="h-12 w-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* ✅ Show Search Bar & Filter only on Properties Page */}
      {page === "properties" && (
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md bg-white">
          <input
            type="text"
            placeholder="Search by title, location, city, or state..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 h-12 px-4 text-gray-700 border-none focus:ring-0 focus:outline-none"
          />

          {/* ✅ Show Filter Button only on Properties Page */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="h-12 w-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white">
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle className="text-lg font-semibold">Filter Properties</DialogTitle>
              <FilterProperties filters={filters} setFilters={setFilters} setOpen={setOpen} />
            </DialogContent>
          </Dialog>

          {/* ✅ Search Button */}
          <button
            onClick={handleSearchRedirect}
            className="h-12 w-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* ✅ Hide Search Bar on Interior Page */}
      {page === "interior" ? null : (
        <>
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
                      src={property.images?.[0] || "/default-image.webp"} // ✅ Handle missing images
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
        </>
      )}
    </div>
  );
};

export default SearchWithRecommendations;
