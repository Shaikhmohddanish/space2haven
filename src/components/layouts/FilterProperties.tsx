"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface FiltersState {
  configuration: string[];
  budget: { min: string; max: string };
  propertyType: string[];
  possession: string;
  city: string;    // 🟢 Added missing property
  state: string;   // 🟢 Added missing property
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

  // If less than 1000, return INR format
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

  // ✅ Correctly parse `configuration`
  const parseConfiguration = (config: any): string[] => {
    if (!Array.isArray(config)) return [];
  
    return config.flatMap((item) => {
      try {
        return typeof item === "string" && item.startsWith("[") ? JSON.parse(item) : item;
      } catch (error) {
        console.error("❌ Error parsing configuration:", error);
        return [];
      }
    });
  };
  

  // ✅ Initialize filter state properly
  const [localFilters, setLocalFilters] = useState<FiltersState>({
    configuration: parseConfiguration(filters?.configuration),
    budget: filters?.budget || { min: "", max: "" },
    propertyType: Array.isArray(filters?.propertyType) ? filters.propertyType : [],
    possession: filters?.possession || "",
    city: filters?.city || "",       // 🟢 Initialize new field
    state: filters?.state || "",     // 🟢 Initialize new field
    newProperty: filters?.newProperty || false,
    resale: filters?.resale || false,
    listingType: filters?.listingType || "buy",
  });

  useEffect(() => {
    setLocalFilters({
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
        const budgetKey = name.split(".")[1];
        return {
          ...prev,
          budget: { ...prev.budget, [budgetKey]: value },
        };
      } else {
        // 🟢 Handle other input types, including new fields like city, state, bhk
        return { ...prev, [name]: value };
      }
      return prev;
    });
  };
  

  const applyFiltersHandler = () => {
    setFilters({
      ...localFilters,
      configuration: localFilters.configuration.length > 0 ? localFilters.configuration : [],
      propertyType: localFilters.propertyType.length > 0 ? localFilters.propertyType : [],
    });
  
    toast({ description: "Filters applied!" });
    setOpen(false);
  };
  
  

  // ✅ Clear Filters
  const clearFiltersHandler = () => {
    const resetFilters: FiltersState = {
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

    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    toast({ description: "Filters cleared!" });
    setOpen(false);
  };

  return (
<div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl text-sm flex flex-col gap-4">
    <h2 className="font-semibold text-center text-gray-700 text-lg">Personalize your space here...</h2>

      {/* 🔹 Configuration (BHK) Multi-Select */}
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

      {/* 🔹 Property Type Multi-Select */}
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

      {/* 🔹 Possession Filter */}
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

      {/* 🔹 Budget Filter */}
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

{/* 🔹 Purchase Type & Listing Type Toggles */}
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




      {/* 🔹 Action Buttons */}
      <div className="flex gap-4">
        <button onClick={clearFiltersHandler} className="w-1/2 bg-gray-500 hover:bg-gray-400 text-white py-2 rounded-md transition">
          Clear Filters
        </button>
        <button onClick={applyFiltersHandler} className="w-1/2 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterProperties;
