"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import DialogBox from "./DialogBox";
import { FilterProps } from "@/types";

const HalfBanner = ({
  search,
  setSearch,
  setFilters,
  filters,
}: { search: string; setSearch: (value: string) => void } & FilterProps) => {
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Sync search from URL
  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <section className="h-[50vh] w-full bg-[url('/images/propertyBanner.webp')] bg-cover bg-center flex-center">
      {/* Content */}
      <div className="bg-black/40 flex flex-col items-center justify-center h-full px-4 text-sand-soft w-full">
        
        {/* Heading */}
        <div className="w-full mb-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Find Your Perfect Space
          </h1>
          <p className="text-gray-200 text-center">
            Browse through our exclusive listings to find your next home.
          </p>
        </div>

        {/* Search Bar (Corrected Size & UI) */}
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md bg-white w-full max-w-lg mx-auto">
  <input
    type="text"
    placeholder="Search by title, location, city, or state..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-[70%] h-12 px-2 text-gray-700 border-none focus:ring-0 focus:outline-none"
  />
  <DialogBox
    type="filter"
    filters={filters}
    setFilters={setFilters}
    className="w-[15%] h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 border-l border-gray-300"
  />
  <button
    type="button"
    className="w-[15%] h-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white border-l border-gray-300"
  >
    <SearchIcon />
  </button>
</div>

      </div>
    </section>
  );
};

export default HalfBanner;
