'use client';

import React, { useState } from 'react';
import "yet-another-react-lightbox/styles.css";
import { DisplayCarousel, DynamicCarousel } from '@/components';
import { formatPrice } from '@/utils/formatPrice';
import GetInTouchPopup from '@/components/layouts/GetInTouchPopup';
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import Image from 'next/image';
import NewPropertiesSlider from '@/components/layouts/NewPropertiesSlider';

export interface Configuration {
  bhkType: string;
  carpetArea: string;
  builtupArea: string;
  carpetAreaUnit: string;
  builtupAreaUnit: string;
  price: string;
}

interface Property {
  _id: string;
  title: string;
  propertyHeading: string;
  recommend:boolean;
  images: string[];
  price: string;
  propertyType: string;
  configuration: string[];
  configurations: Configuration[];
  description: string;
  overview:string;
  location: string;
  area: string;
  areaUnit: string;
  yearBuilt: number;
  features: string[];
  possession: string;
  possessionDate: string;
  developer: string;
  featured: boolean;
  newProperty: boolean;
  address: {
    city: string;
    state: string;
  };
  updatedAt: string;
}

interface PropertyDetailsProps {
  property: Property;
  recommended: Property[];
}

export default function PropertyDetails({ property,recommended }: PropertyDetailsProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreOverview, setShowMoreOverview] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const maxVisibleAmenities = 6;
  const shouldShowButton = property.features && property.features.length > maxVisibleAmenities;
    
  const uniqueBHK = Array.from(new Set(property.configurations.map((c) => c.bhkType)));
  const recommendedInSameCity = recommended.filter(
    (rec) => rec.address.city === property.address.city && rec._id !== property._id
  );
  const filteredConfigs =
    activeTab === "All"
      ? property.configurations
      : property.configurations.filter((cfg) => cfg.bhkType === activeTab);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">

      {/* Image Slider with corrected slidesToShow */}
      <div className="w-full my-6">
        {property.images && property.images.length > 0 && <DisplayCarousel images={property.images} />}
      </div>

      <div className="w-full flex justify-between items-center flex-wrap gap-4">

  {/* Left side: Property Title & Price */}
  <div className="flex-1 min-w-[200px]">
    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{property.title}</h1>
    <div className="mt-2">
      <p className="text-xl md:text-3xl font-bold text-orange-500">
        INR {formatPrice(property.price)}
      </p>
      <p className="text-gray-500 text-sm md:text-base">Onwards</p>
    </div>
  </div>

  {/* Right side: Developer Name */}
  <div className="text-right flex-shrink-0">
    <p className="text-sm md:text-base text-gray-500">Developer</p>
    <p className="text-base md:text-xl font-semibold text-gray-700">{property.developer || "N/A"}</p>
    <br/>
    <p className="text-sm md:text-base text-gray-500">Property Type</p>
    <p className="text-base md:text-xl font-semibold text-gray-700">{property.propertyType || "N/A"}</p>
  </div>

</div>

{/* Div visible only on big screens (desktop/tablet) */}
<div className="hidden md:grid bg-white shadow rounded-lg border w-full my-6 py-6 grid-cols-5 gap-4 text-center items-center">

  <div className="border-r border-gray-300">
    <p className="text-sm text-gray-500">Configurations</p>
    <p className="font-semibold">{property.configuration.join(", ")}</p>
  </div>

  <div className="border-r border-gray-300">
    <p className="text-sm text-gray-500">Possession Date</p>
    <p className="font-semibold">
      {new Date(property.possessionDate).toLocaleString('default', { month: 'short', year: 'numeric' })}
    </p>
  </div>

  <div className="border-r border-gray-300">
    <p className="text-sm text-gray-500">Built-up Area</p>
    <p className="font-semibold">On request</p>
  </div>

  <div className="border-r border-gray-300">
  <p className="text-sm text-gray-500">Carpet Area</p>
  <p className="font-semibold">
    {property.area ? `${property.area} ${property.areaUnit || "sq.m"}` : "N/A"}
  </p>
</div>

<div>
  <p className="text-sm text-gray-500">Min. Price per {property.areaUnit}</p>
  <p className="font-semibold">
    {property.price && property.area ? (
      `INR ${(parseFloat(property.price) / parseFloat(property.area)).toFixed(2)} per ${property.areaUnit || 'sq.m'}`
    ) : "N/A"}
  </p>
</div>

  
</div>

<div className="grid grid-cols-2 md:hidden bg-white shadow rounded-lg border text-center my-6">
  {[
    { label: "Configurations", value: property.configuration.join(", ") },
    { label: "Possession Date", value: new Date(property.possessionDate).toLocaleString('default', { month: 'short', year: 'numeric' }) },
    { label: "Built-up Area", value: "On request" },
    { 
      label: "Carpet Area", 
      value: property.area 
        ? `${property.area} ${property.areaUnit || "sq.m"}` 
        : "N/A" 
    },
        { label: `Min. Price per ${property.areaUnit || "sq.m"}.`, value: `INR ${(parseInt(property.price) / parseInt(property.area)).toFixed(2)} per ${property.areaUnit || "sq.m"}.` }
  ].map((item, idx, arr) => {
    const isLastOddItem = arr.length % 2 !== 0 && idx === arr.length - 1;
    const borderRight = idx % 2 === 0 && !isLastOddItem;
    const borderBottom = idx < arr.length - (isLastOddItem ? 1 : 2);

    return (
      <div
        key={idx}
        className={`py-4 px-2 ${borderRight ? "border-r border-gray-200" : ""} ${borderBottom ? "border-b border-gray-200" : ""} ${isLastOddItem ? "col-span-2 border-t border-gray-200" : ""}`}
      >
        <p className="text-sm text-gray-500">{item.label}</p>
        <p className="font-semibold text-base">{item.value}</p>
      </div>
    );
  })}
</div>

      

      {/* Overview with see more/less */}
      {property.overview && property.overview.trim() !== "" && (
      <div>
        <h2 className="text-2xl font-semibold"><span className='text-orange-500'>Overview</span> of {property.title}</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {showMoreOverview ? property.overview : `${property.overview.slice(0,300)}...`}
          {property.overview.length > 300 && (
            <button onClick={() => setShowMoreOverview(!showMoreOverview)} className="ml-2 underline text-blue-500">
              {showMoreOverview ? "See less" : "See more"}
            </button>
          )}
        </p>
      </div>
      )}


      {/* Configuration Tabs */}
      <div>
  <h2 className="text-2xl font-semibold text-orange-500">Configurations</h2>

  {/* Tab Buttons */}
  <div className="flex gap-2 my-4 overflow-x-auto whitespace-nowrap">
    {["All", ...uniqueBHK].map((tab) => (
      <button 
        key={tab} 
        className={`px-4 py-2 rounded-lg flex-shrink-0 ${activeTab === tab ? 'bg-orange-500 text-white' : 'bg-gray-200'}`} 
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Desktop Grid (Now 3 or 4 Columns) */}
  <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
    {filteredConfigs.map((cfg, idx) => (
      <div key={idx} className="border rounded-lg shadow p-6 text-center">
        
        {/* Image */}
        <div className="flex justify-center mb-3">
          <Image 
            src={`/configuration/${parseInt(cfg.bhkType) > 4 ? "4BHK" : cfg.bhkType.trim().replace(/\s/g, "").replace("4+", "4")}.webp`} 
            alt={cfg.bhkType}
            width={120} 
            height={120} 
            className="w-36 h-auto object-contain"
          />
        </div>

        {/* Text Details (Structured Layout) */}
        <h3 className="font-semibold text-lg mb-2">{cfg.bhkType}</h3>
        
        {/* Two-column layout for Carpet & Built-up Area */}
        <div className="grid grid-cols-2 gap-2 text-sm">
  {/* ✅ Carpet Area Handling */}
  <p className="font-semibold text-gray-700">Carpet Area:</p>
  {cfg.carpetArea && cfg.carpetArea.toLowerCase() !== "on request" ? (
    <p>{cfg.carpetArea} {cfg.carpetAreaUnit}</p>
  ) : (
    <p>{cfg.carpetArea}</p>
  )}

  {/* ✅ Built-up Area Handling */}
  <p className="font-semibold text-gray-700">Built-up Area:</p>
  {cfg.builtupArea && cfg.builtupArea.toLowerCase() !== "on request" ? (
    <p>{cfg.builtupArea} {cfg.builtupAreaUnit}</p>
  ) : (
    <p>{cfg.builtupArea}</p>
  )}
</div>


        {/* Price - Full Row */}
        <p className="mt-3 font-semibold text-gray-800 text-lg">
          Price: {cfg.price}
        </p>
      </div>
    ))}
  </div>

  {/* Mobile Slider */}
  <div className="md:hidden overflow-x-auto whitespace-nowrap flex gap-4 p-2">
    {filteredConfigs.map((cfg, idx) => (
      <div key={idx} className="min-w-[280px] border rounded-lg shadow p-4 flex-shrink-0 text-center">
        
        {/* Image */}
        <div className="flex justify-center mb-3">
          <Image 
            src={`/configuration/${parseInt(cfg.bhkType) > 4 ? "4BHK" : cfg.bhkType.trim().replace(/\s/g, "").replace("4+", "4")}.webp`} 
            alt={cfg.bhkType}
            width={100} 
            height={100} 
            className="w-36 h-auto object-contain"
          />
        </div>

        {/* Text Details (Structured Layout) */}
        <h3 className="font-semibold text-lg mb-2">{cfg.bhkType}</h3>
        
        {/* Two-column layout for Carpet & Built-up Area */}
        <div className="grid grid-cols-2 gap-2 text-sm">
  <p className="font-semibold text-gray-700">Carpet Area:</p>
  {cfg.carpetArea && cfg.carpetArea.toLowerCase() !== "on request" ? (
    <p>{cfg.carpetArea} {cfg.carpetAreaUnit}</p>
  ) : (
    <p>{cfg.carpetArea}</p> // Shows only carpetArea if it's "On Request"
  )}

  <p className="font-semibold text-gray-700">Built-up Area:</p>
  {cfg.builtupArea && cfg.builtupArea.toLowerCase() !== "on request" ? (
    <p>{cfg.builtupArea} {cfg.builtupAreaUnit}</p>
  ) : (
    <p>{cfg.builtupArea}</p> // Shows only builtupArea if it's "On Request"
  )}
</div>


        {/* Price - Full Row */}
        <p className="mt-3 font-semibold text-gray-800 text-lg">
          Price: ₹{cfg.price}
        </p>
      </div>
    ))}
  </div>
</div>

      {/* Amenities */}
      {property.features && property.features.length > 0 && (
<div className="w-full">
      <h2 className="text-2xl font-semibold text-orange-500 mb-4">Amenities</h2>

      {/* Grid Wrapper - Ensures Proper Alignment */}
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
        {property.features
          .slice(0, showAllAmenities ? property.features.length : maxVisibleAmenities)
          .map((feature, idx) => (
            <li key={idx} className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={`/amenities/${feature.replace(/\s+/g, "_")}.png`}
                  alt={feature}
                  width={50}
                  height={50}
                  className="w-full h-auto"
                />
              </div>
              <span className="text-gray-700 text-sm font-medium mt-2">{feature.replace(/_/g, " ")}</span>
            </li>
          ))}
      </ul>

      {/* Expand/Collapse Button - Positioned Properly */}
      {shouldShowButton && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="p-3 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-600 focus:outline-none transition"
          >
            {showAllAmenities ? <IoChevronUp className="text-2xl" /> : <IoChevronDown className="text-2xl" />}
          </button>
        </div>
      )}
    </div>
     )}


      {/* About with see more/less */}
      <div>
        <h2 className="text-2xl font-semibold"> <span className='text-orange-500'>About</span>  {property.title}</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {showMore ? property.description : `${property.description.slice(0,300)}...`}
          {property.description.length > 300 && (
            <button onClick={() => setShowMore(!showMore)} className="ml-2 underline text-blue-500">
              {showMore ? "See less" : "See more"}
            </button>
          )}
        </p>
      </div>

      {/* Location Map */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-orange-500">Location on Map</h2>
        <iframe
          width="100%"
          height="350"
          className="rounded-lg shadow"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
        />
      </div>

      <div className="mt-8 w-full flex justify-center text-black p-4 rounded-lg">
  <button
    className="border border-green-600 text-green-600 py-2 px-4 rounded-md font-medium hover:bg-green-600 hover:text-white transition"
    onClick={() => setSelectedProperty(property.title)}
  >
    Get in Touch
  </button>

  {selectedProperty && (
    <GetInTouchPopup
      propertyTitle={selectedProperty}
      onClose={() => setSelectedProperty(null)}
    />
  )}
</div>
        {/* 🏘️ Recommended Properties (Slider) */}
      {recommendedInSameCity.length > 0 && (
        <>
          <hr className="my-8 w-full max-w-4xl" />
          <div className="w-full max-w-6xl">
            <h1 className="text-2xl font-semibold mb-4 text-home">Recommended Properties in {property.address.city}</h1>
            <NewPropertiesSlider data={recommendedInSameCity as Property[]} />
          </div>
        </>
      )}
    </div>
  );
}
