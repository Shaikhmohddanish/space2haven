"use client";

import { DisplayProperties, LoaderLayout, DynamicCarousel } from "@/components";
import { PropertiesPageContentProps, Property } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePathname } from "next/navigation";
import FeaturedPropertiesSlider from "./FeaturedPropertiesSlider";

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
  const currentYear = new Date().getFullYear();

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
          setDisplayedData(response.data.slice(0, itemsPerPage));
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
      setDisplayedData(cachedProperties.slice(0, itemsPerPage));
    }
  }, [cachedProperties]);

  // ✅ Apply Filters and Search
  useEffect(() => {
    let searchData = [...data];

    // 🔎 Search Filter
    if (search) {
      searchData = searchData.filter((property) =>
        [property.title, property.location, property.address.city, property.address.state,property.developer]
          .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // 🏠 Configuration Filter
    if (filters.configuration.length > 0) {
      searchData = searchData.filter((property) =>
        property.configuration.some((bhk) => filters.configuration.includes(bhk))
      );
    }

    // 🏡 Property Type Filter
    if (filters.propertyType.length > 0) {
      searchData = searchData.filter((property) =>
        filters.propertyType.includes(property.propertyType)
      );
    }

    // 📆 Possession Filter
    if (filters.possession) {
      searchData = searchData.filter((property) => property.possession === filters.possession);
    }

    if (filters.developer) {
      searchData = searchData.filter((property) => property.developer === filters.developer);
    }

    // 💰 Budget Filter
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
    setDisplayedData(searchData.slice(0, itemsPerPage));
    setPage(1);
  }, [search, filters, data]);

  // ✅ Load More Data (Infinite Scroll)
  const loadMoreData = () => {
    const nextPage = page + 1;
    const nextData = filteredData.slice(page * itemsPerPage, nextPage * itemsPerPage);
    setDisplayedData((prevData) => [...prevData, ...nextData]);
    setPage(nextPage);
  };

  // ✅ Filter Featured, Recommended, and New Properties
  const featuredProperties = data.filter((property) => property.featured);
  const recommendedProperties = data.filter((property) => property.recommend);
  const newProperties = data.filter(
    (property) => property.yearBuilt === currentYear || property.yearBuilt === currentYear - 1
  );

  return (
    <section className="min-h-screen w-full flex justify-center items-start flex-col md:flex-row px-4 md:px-10 bg-[url(/images/pattern.png)]">
      <main className="flex flex-col w-full h-full p-4 md:p-6 gap-4">
        {/* ✅ Show Sliders Only If Search is Empty */}
        {!search && (
          <>
            {/* ✅ Featured Properties Slider */}
            {featuredProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 text-home">Featured Properties</h1>
                <FeaturedPropertiesSlider data={featuredProperties as Property[]} />
                </div>
            )}

            {/* ✅ Recommended Properties Slider */}
            {recommendedProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 text-home">Recommended Properties</h1>
                <DynamicCarousel data={recommendedProperties as Property[]} loading={false} type="home-properties" />
              </div>
            )}

            {/* ✅ New Properties Slider */}
            {newProperties.length > 0 && (
              <div className="w-full my-6">
                <h1 className="text-2xl font-semibold mb-4 text-home">New Properties</h1>
                <DynamicCarousel data={newProperties as Property[]} loading={false} type="home-properties" />
              </div>
            )}
          </>
        )}

        {/* ✅ Show "Discover Your Dream Property with Us" if Search is Active */}
        {search && (
          <h1 className="text-2xl font-semibold text-center my-4 text-home">
            Discover Your Dream Property with Us
          </h1>
        )}

        {/* ✅ Property Listings Based on Search */}
        {search && (
          <InfiniteScroll
            dataLength={displayedData.length}
            next={loadMoreData}
            hasMore={displayedData.length < filteredData.length}
            loader={<LoaderLayout />}
          >
            <DisplayProperties data={displayedData} />
          </InfiniteScroll>
        )}
      </main>
    </section>
  );
};

export default PropertiesPageContent;
