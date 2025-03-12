"use client";

import React,{ useState } from "react";
import { DisplayCarousel, DialogBox, DynamicCarousel } from "@/components";
import moment from "moment";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/utils/formatPrice";


import { 
  Shield, Wifi, Flame, Droplet, Dumbbell, Gamepad, Trees, Coffee, 
  Store, Film, BatteryCharging, Home, Key, Lock, Sun, Heart, Dog, CheckSquare, 
  ShoppingCart, Tv2, Car, Waves, BarChart 
} from "lucide-react";

const amenityIcons: { [key: string]: JSX.Element } = {
  "24/7 Security & CCTV Surveillance": <Shield className="w-5 h-5 text-home" />,
  "Power Backup": <BatteryCharging className="w-5 h-5 text-home" />,
  "High-Speed Elevators": <Key className="w-5 h-5 text-home" />,
  "Car Parking (Covered & Open)": <Car className="w-5 h-5 text-home" />,
  "Water Supply & Rainwater Harvesting": <Droplet className="w-5 h-5 text-home" />,
  "Swimming Pool": <Waves className="w-5 h-5 text-home" />,
  "Clubhouse": <Coffee className="w-5 h-5 text-home" />,
  "Gym & Fitness Center": <Dumbbell className="w-5 h-5 text-home" />,
  "Indoor Games": <Gamepad className="w-5 h-5 text-home" />,
  "Multipurpose Court": <CheckSquare className="w-5 h-5 text-home" />,
  "Kids’ Play Area": <Tv2 className="w-5 h-5 text-home" />,
  "Landscaped Gardens & Green Spaces": <Trees className="w-5 h-5 text-home" />,
  "Jogging & Cycling Tracks": <BarChart className="w-5 h-5 text-home" />,
  "Yoga & Meditation Area": <Sun className="w-5 h-5 text-home" />,
  "Elderly Sitting Areas": <Heart className="w-5 h-5 text-home" />,
  "Pet-Friendly Zones": <Dog className="w-5 h-5 text-home" />,
  "Smart Home Features": <Wifi className="w-5 h-5 text-home" />,
  "Retail & Convenience Stores": <ShoppingCart className="w-5 h-5 text-home" />,
  "Multipurpose Hall & Co-Working Spaces": <Home className="w-5 h-5 text-home" />,
  "Cinema/Private Theatre": <Film className="w-5 h-5 text-home" />,
  "EV Charging Stations": <BatteryCharging className="w-5 h-5 text-home" />,
  "Barbeque Area": <Flame className="w-5 h-5 text-home" />,
  "Lift": <Key className="w-5 h-5 text-home" />,
  "Garden": <Trees className="w-5 h-5 text-home" />,
  "Parking": <Car className="w-5 h-5 text-home" />,
  "CCTV Security": <Lock className="w-5 h-5 text-home" />,
  "Senior Citizen Zone": <Heart className="w-5 h-5 text-home" />,
  "Jogging Track": <BarChart className="w-5 h-5 text-home" />,
  "Kid's Area": <Tv2 className="w-5 h-5 text-home" />
};


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
  images: string[];
  price: string;
  propertyType: string;
  configuration: string[];
  configurations: Configuration[];  // ✅ New: For detailed configurations
  description: string;
  location: string;
  area: string;
  areaUnit: string;
  yearBuilt: number;
  features: string[];
  possession: string;
  possessionDate: string;
  developer: string;
  url:string;
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
  isAdmin?: boolean;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, recommended, isAdmin = false }) => {
  const { toast } = useToast();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");

  if (!property) {
    return <div className="text-center py-20 text-xl font-semibold">Property details not found.</div>;
  }

  const {
    _id,
    images,
    title,
    configuration,
    configurations,
    area,
    areaUnit,
    features,
    location,
    description,
    price,
    propertyType,
    possession,
    possessionDate,
    developer,
    featured,
    newProperty,
    url,
    address,
    updatedAt,
  } = property;
  
  // Filter configurations based on active tab
  const filteredConfigs = activeTab === "All" 
    ? (configurations || [])  // ✅ Provide a fallback empty array
    : (configurations || []).filter((config) => config.bhkType === activeTab);


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
            <span className="font-bold">Area:</span> {area ? `${area} ${areaUnit || ""}` : "N/A"}
          </h2>

          <h1 className="font-bold text-xl">
            <span className="font-bold">Onwards Price:</span> ₹ {formatPrice(price) || "N/A"}
          </h1>

          <h2 className="md:text-lg font-semibold">
            <span className="font-bold">Property Type:</span> {propertyType || "N/A"}
          </h2>
          <h2 className="md:text-lg font-semibold">
          <span className="font-bold">PossessionDate:</span> {possessionDate ? possessionDate : "To be announced"}
          </h2>
        </div>

       {/* 🟢 Display Configurations Only if Available */}
{configurations && configurations.length > 0 && (
  <>
    {/* 🟢 Tab-based Filter */}
    <div className="flex gap-2 my-4">
      {["All", ...new Set(configurations.map((config) => config.bhkType))].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-md ${
            activeTab === tab ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* 🟢 Display Configurations */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {filteredConfigs.map((config, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">{config.bhkType || "N/A"}</h2>
          <p>
            <span className="font-bold">Carpet Area:</span> {config.carpetArea || "N/A"} {config.carpetAreaUnit || ""}
          </p>
          <p>
            <span className="font-bold">Built-up Area:</span> {config.builtupArea || "On Request"} {config.builtupAreaUnit || ""}
          </p>
          <p>
            <span className="font-bold">Price:</span> ₹ {config.price ? formatPrice(config.price) : "N/A"}
          </p>
        </div>
      ))}
    </div>
  </>
)}



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

        {url && (
          <div className="my-6">
            <h2 className="text-xl font-semibold mb-2">Location Map:</h2>
            <iframe
              src={`https://www.google.com/maps/embed?pb=${url}`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            />
          </div>
        )}

         
        <hr className="w-full max-w-full my-4" />

        <div>
  <h1 className="text-xl font-semibold">About</h1>
  {description && description.length > 200 ? (
    

    <div className="text-gray-700 leading-relaxed">
    {showFullDescription ? (
      <div
        className="whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />').replace(/\r/g, '') }}
      />
    ) : (
      <div
        className="whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: `${description.slice(0, 200).replace(/\n/g, '<br />').replace(/\r/g, '')}...` }}
      />
    )}
    <button 
      onClick={() => setShowFullDescription(!showFullDescription)} 
      className="text-blue-500 ml-2 underline hover:text-blue-700 transition"
    >
      {showFullDescription ? "Show less" : "See more"}
    </button>
  </div>
  
  ) : (
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description || "No description available."}</p>
  )}
</div>

<hr className="w-full max-w-full my-4" />

        <div>
        <h2 className="font-semibold mb-2">Amenities:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Array.isArray(features) && features.length > 0 ? (
            features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-700">
                {amenityIcons[feature] || <Home className="w-5 h-5 text-home" />}
                <span>{feature}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-700">N/A</p>
          )}
        </div>
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
