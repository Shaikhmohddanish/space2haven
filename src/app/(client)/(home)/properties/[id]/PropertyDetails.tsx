"use client";

import React from "react";
import { DisplayCarousel, DialogBox, DynamicCarousel } from "@/components";
import { Check, Trash2, UserRoundPen } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Property {
  _id: string;
  title: string;
  images: string[];
  price: string;
  propertyType: string;
  configuration: string[];
  description: string;
  location: string;
  area: string;
  yearBuilt: number;
  features: string[];
  possession: string;
  developer: string;
  address: {
    city: string;
    state: string;
  };
  updatedAt: string;
}

interface PropertyDetailsProps {
  property: Property;
  recommended: Property[];
  isAdmin?: boolean;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, recommended, isAdmin = false }) => {
  const router = useRouter();
  const { toast } = useToast();

  if (!property) {
    return <div className="text-center py-20 text-xl font-semibold">Property details not found.</div>;
  }

  const {
    _id,
    images,
    title,
    configuration,
    area,
    features,
    location,
    description,
    price,
    propertyType,
    possession,
    developer,
    address,
    updatedAt,
  } = property;

  return (
    <section className="min-h-screen w-full flex-center flex-col py-20 px-4 bg-[url('/images/pattern.png')]">
      {/* 🏡 Property Image Carousel */}
      <div className="w-full max-w-6xl mb-10">
        {images && images.length > 0 && <DisplayCarousel images={images} />}
      </div>

      {/* 📜 Property Details */}
      <div className="w-full max-w-6xl space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl lg:text-3xl font-bold text-left w-full text-home">{title || "Title"}</h1>
        </div>

        {/* 🔹 Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="md:text-lg font-semibold">
            <span className="font-bold">Developer:</span> {developer || "N/A"}
          </h2>
          <h2 className="md:text-lg font-semibold">
            <span className="font-bold">Configuration:</span> {Array.isArray(configuration) && configuration.length > 0 
    ? configuration.join(", ") 
    : "N/A"}
          </h2>
          <h2 className="md:text-lg font-semibold">
            <span className="font-bold">Area:</span> {area || "N/A"}
          </h2>
          <h1 className="font-bold text-xl">
            <span className="font-bold">Price:</span> ₹ {price || "N/A"}
          </h1>
          <h2 className="md:text-lg font-semibold">
            <span className="font-bold">Property Type:</span> {propertyType || "N/A"}
          </h2>
          <h2 className="md:text-lg font-semibold">
          <span className="font-bold">Possession:</span> {possession ? possession.replace(/_/g, " ") : "N/A"}
          </h2>
        </div>

        {/* 🏠 Property Features */}
        <div>
          <h2 className="font-semibold">Amenities:</h2>
          <p className="text-gray-700">
  

 {Array.isArray(features) && features.length > 0 
    ? features.join(", ") 
    : "N/A"}
</p>
        </div>

        {/* 📍 Location & Other Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold">Location:</h2>
            <p>
              {location || "Not specified"}, {address?.city}, {address?.state}
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Last Updated:</h2>
            <p>{moment(updatedAt).fromNow()}</p>
          </div>
        </div>

        <hr className="w-full max-w-full my-4" />

        {/* 📝 Property Description */}
        <div>
          <h1 className="text-xl font-semibold">About</h1>
          <p className="text-gray-700 leading-relaxed">{description || "No description available."}</p>
        </div>

        {/* 📨 Contact Form */}
        <div className="mt-8 w-full flex justify-center bg-black text-white p-4 rounded-lg">
          <DialogBox />
        </div>
      </div>

      {/* 🏘️ Recommended Properties (Slider) */}
      {recommended.length > 0 && (
        <>
          <hr className="my-8 w-full max-w-4xl" />
          <div className="w-full max-w-6xl">
            <h1 className="text-2xl font-semibold mb-4 text-home">Recommended Properties</h1>
            <DynamicCarousel data={recommended as Property[]} loading={false} type="home-properties" />
          </div>
        </>
      )}
    </section>
  );
};

export default PropertyDetails;
