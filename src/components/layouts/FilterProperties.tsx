"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { PropertyCacheContext } from "./PropertyCacheContext";

interface Property {
  title: string;
  developer: string;
  location: string;
  address?: {
    city: string;
  };
}

interface FiltersState {
  search?: string;
  configuration: string[];
  budget: { min: string; max: string };
  propertyType: string[];
  possession: string;
  city: string;
  state: string;
  newProperty: boolean;
  resale: boolean;
  listingType: 'buy' | 'rent';
}

const convertToIndianCurrencyWords = (num: string | number): string => {
  const n = parseFloat(num.toString());
  if (isNaN(n)) return "";

  if (n >= 1e7) return `${(n / 1e7).toFixed(1)} Crore Rupees`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(1)} Lakh Rupees`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)} Thousand Rupees`;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
};

const FilterProperties = ({
  setFilters,
  filters,
  setOpen,
}: {
  setFilters: (filters: FiltersState) => void;
  filters: any;
  setOpen: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { properties } = useContext(PropertyCacheContext);

  const [search, setSearch] = useState(filters?.search || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const parseConfiguration = (config: any): string[] => {
    if (!Array.isArray(config)) return [];
  
    return config.flatMap((item) => {
      try {
        return typeof item === "string" && item.startsWith("[") ? JSON.parse(item) : item;
      } catch (error) {
        console.error("Error parsing configuration:", error);
        return [];
      }
    });
  };

  const [localFilters, setLocalFilters] = useState<FiltersState>({
    search: filters?.search || "",
    configuration: parseConfiguration(filters?.configuration),
    budget: filters?.budget || { min: "", max: "" },
    propertyType: Array.isArray(filters?.propertyType) ? filters.propertyType : [],
    possession: filters?.possession || "",
    city: filters?.city || "",
    state: filters?.state || "",
    newProperty: filters?.newProperty || false,
    resale: filters?.resale || false,
    listingType: filters?.listingType || "buy",
  });

  useEffect(() => {
    setLocalFilters({
      search: filters?.search || "",
      configuration: parseConfiguration(filters?.configuration),
      budget: filters?.budget || { min: "", max: "" },
      propertyType: Array.isArray(filters?.propertyType) ? filters.propertyType : [],
      possession: filters?.possession || "",
      city: filters?.city || "",
      state: filters?.state || "",
      newProperty: filters?.newProperty || false,
      resale: filters?.resale || false,
      listingType: filters?.listingType || "buy",
    });
  }, [filters]);

  const fetchSuggestions = useCallback(
    debounce(async (searchValue: string) => {
      if (!searchValue.trim()) return;

      setLoading(true);
      setShowSuggestions(true);

      try {
        if (properties.length > 0) {
          const suggestionsSet = new Set<string>();
          properties.forEach((property: Property) => {
            const values = [property.title, property.developer, property.location, property.address?.city];
            values.forEach((value) => {
              if (value && value.toLowerCase().includes(searchValue.toLowerCase())) {
                suggestionsSet.add(value);
              }
            });
          });

          let suggestionsArray = Array.from(suggestionsSet);
          suggestionsArray.sort((a, b) => {
            const lowerQuery = searchValue.toLowerCase();
            const aLower = a.toLowerCase();
            const bLower = b.toLowerCase();

            if (aLower === lowerQuery) return -1;
            if (bLower === lowerQuery) return 1;

            if (aLower.startsWith(lowerQuery) && !bLower.startsWith(lowerQuery)) return -1;
            if (bLower.startsWith(lowerQuery) && !aLower.startsWith(lowerQuery)) return 1;

            return 0;
          });

          setSuggestions(suggestionsArray);
        } else {
          const response = await fetch(`/api/suggestions?query=${encodeURIComponent(searchValue)}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          setSuggestions(data.suggestions?.length ? data.suggestions : []);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [properties]
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setLocalFilters(prev => ({ ...prev, search: value }));
    if (value.length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (value: string) => {
    setSearch(value);
    setLocalFilters(prev => ({ ...prev, search: value }));
    setSuggestions([]);
    setShowSuggestions(false);
    handleSearchRedirect(value);
  };

  const handleSearchRedirect = (searchValue: string = search) => {
    if (!searchValue.trim()) {
      toast({ description: "Please enter a search term before applying filters." });
      return;
    }
    router.push(`/properties?search=${encodeURIComponent(searchValue)}`);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
  
    setLocalFilters((prev) => {
      if (isCheckbox) {
        const target = e.target as HTMLInputElement;
        const checked = target.checked;
  
        if (name === "configuration") {
          const updatedConfig = checked
            ? [...prev.configuration, value]
            : prev.configuration.filter((item) => item !== value);
          return { ...prev, configuration: updatedConfig };
        }
  
        if (name === "propertyType") {
          const updatedPropertyType = checked
            ? [...prev.propertyType, value]
            : prev.propertyType.filter((item) => item !== value);
          return { ...prev, propertyType: updatedPropertyType };
        }
      } else if (name.startsWith("budget.")) {
        const budgetKey = name.split(".")[1] as "min" | "max";
        return {
          ...prev,
          budget: { ...prev.budget, [budgetKey]: value },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const applyFiltersHandler = () => {
    if (!search.trim()) {
      toast({ description: "Please enter a search term before applying filters." });
      return;
    }

    setFilters({
      ...localFilters,
      search,
      configuration: localFilters.configuration.length > 0 ? localFilters.configuration : [],
      propertyType: localFilters.propertyType.length > 0 ? localFilters.propertyType : [],
    });
  
    router.push(`/properties?search=${encodeURIComponent(search)}`);
    toast({ description: "Filters applied!" });
    setOpen(false);
  };

  const clearFiltersHandler = () => {
    const resetFilters: FiltersState = {
      search: "",
      configuration: [],
      budget: { min: "", max: "" },
      propertyType: [],
      possession: "",
      city: "",
      state: "",
      newProperty: false,
      resale: false,
      listingType: "buy",
    };

    setSearch("");
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    toast({ description: "Filters cleared!" });
    setOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl text-sm flex flex-col gap-4">
      <h2 className="font-semibold text-center text-gray-700 text-lg">Personalize your space here...</h2>
      
      {/* Search Bar with Suggestions */}
      <div className="relative w-full mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
          <input
            type="text"
            placeholder="Search by Locality, Project, or Developer..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-[85%] h-12 px-4 text-black border-none focus:ring-0 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleSearchRedirect()}
            className="w-[15%] h-12 flex items-center justify-center bg-white text-black border-l border-gray-300"
          >
            <SearchIcon />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && search.length > 1 && (
          <div className="absolute z-30 bg-white shadow-lg rounded-lg mt-1 max-h-80 overflow-y-auto border border-gray-200 w-full">
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

      {/* Configuration (BHK) Multi-Select */}
      <div className="mb-4">
        <p className="mb-2 font-medium text-gray-600">Configuration (BHK)</p>
        <div className="flex flex-wrap gap-2">
          {["1 BHK","1.5 BHK", "2 BHK","2.5 BHK", "3 BHK","3.5 BHK", "4+ BHK"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="configuration"
                value={option}
                checked={localFilters.configuration.includes(option)}
                onChange={handleInputChange}
                className="cursor-pointer"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Property Type Multi-Select */}
      <div className="mb-4">
        <p className="mb-2 font-medium text-gray-600">Property Type</p>
        <div className="flex flex-wrap gap-2">
          {["Residential","Commercial", "Villa","Plots"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="propertyType"
                value={type}
                checked={localFilters.propertyType.includes(type)}
                onChange={handleInputChange}
                className="cursor-pointer"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Possession Filter */}
      <select
        name="possession"
        value={localFilters.possession}
        onChange={handleInputChange}
        className="p-3 border rounded-md focus:ring focus:outline-none w-full"
      >
        <option value="">Select Possession</option>
        <option value="ready">Ready to Move</option>
        <option value="1_year">In 1 Year</option>
        <option value="2_years">In 2 Years</option>
        <option value="3_years">In 3 Years</option>
        <option value="after_3_years">After 3 Years</option>
      </select>

      {/* Budget Filter */}
      <div className="mb-4">
        <p className="mb-2 font-medium text-gray-600">Budget</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              name="budget.min"
              placeholder="Min Budget"
              value={localFilters.budget?.min || ""}
              onChange={handleInputChange}
              className="p-3 border rounded-md focus:ring focus:outline-none w-full"
            />
            {localFilters.budget?.min && (
              <p className="text-xs text-gray-500 mt-1">
                {convertToIndianCurrencyWords(localFilters.budget.min)}
              </p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="budget.max"
              placeholder="Max Budget"
              value={localFilters.budget?.max || ""}
              onChange={handleInputChange}
              className="p-3 border rounded-md focus:ring focus:outline-none w-full"
            />
            {localFilters.budget?.max && (
              <p className="text-xs text-gray-500 mt-1">
                {convertToIndianCurrencyWords(localFilters.budget.max)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Type & Listing Type Toggles */}
      <div className="mb-4">
        <p className="font-semibold text-gray-700 text-base mb-2">Purchase Type</p>

        {/* New Projects Toggle */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-medium">New Projects</p>
            <p className="text-xs text-gray-500">
              Recently added best residential projects from top rated builders.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              name="newProperty"
              checked={localFilters.newProperty}
              onChange={() =>
                setLocalFilters({ ...localFilters, newProperty: !localFilters.newProperty })
              }
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all peer-focus:ring-2 peer-focus:ring-indigo-500" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform" />
          </label>
        </div>

        {/* Resale Toggle */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-medium">Resale</p>
            <p className="text-xs text-gray-500">
              Flats posted by property owners. You can contact owner directly.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              name="resale"
              checked={localFilters.resale}
              onChange={() =>
                setLocalFilters({ ...localFilters, resale: !localFilters.resale })
              }
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all peer-focus:ring-2 peer-focus:ring-indigo-500" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform" />
          </label>
        </div>

        {/* Buy or Rent Toggle */}
        <div className="flex justify-between items-center mt-4">
          <p className="font-medium">Looking to</p>
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              type="button"
              className={`px-4 py-1 text-sm ${
                localFilters.listingType === "buy"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setLocalFilters({ ...localFilters, listingType: "buy" })}
            >
              Buy
            </button>
            <button
              type="button"
              className={`px-4 py-1 text-sm ${
                localFilters.listingType === "rent"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setLocalFilters({ ...localFilters, listingType: "rent" })}
            >
              Rent
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={clearFiltersHandler} 
          className="w-1/2 bg-gray-500 hover:bg-gray-400 text-white py-2 rounded-md transition"
        >
          Clear Filters
        </button>
        <button 
          onClick={applyFiltersHandler} 
          className="w-1/2 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterProperties;
