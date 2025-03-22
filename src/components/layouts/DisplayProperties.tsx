import { Property } from "@/types";
import PropertyCard from "../PropertyCard";

const DisplayProperties = ({ data }: { data: Property[] }) => {
  if (!data || data.length === 0) {
    return <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">Data not found</h1>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 items-center justify-center">
      {data.map(({ 
        _id, 
        propertyType, 
        price, 
        images, 
        configuration, 
        configurations,
        features, 
        location, 
        possessionDate, 
        developer,
        recommend,
        featured,
        newProperty,
      }) => (
        <PropertyCard
          key={_id}
          id={_id}
          imageSrc={images?.[0] || "/images/default-image.webp"} // ✅ Handle missing images
          price={price || "N/A"} // ✅ Handle missing price
          features={Array.isArray(features) ? features : []} // ✅ Ensure features is always an array
          configuration={Array.isArray(configuration) ? configuration : []} // ✅ Ensure configuration is always an array
          possessionDate={possessionDate || "To be announced"}
          developer={developer || "N/A"}
          propertyType={propertyType || "N/A"} // ✅ Handle missing property type
          tag={propertyType || "N/A"}
          location={location || "Not specified"} // ✅ Handle missing location
          recommend={recommend ?? false} // ✅ Ensure recommend is always a boolean
          featured={featured ?? false} 
          newProperty={newProperty ?? false} 
        />
      ))}
    </div>
  );
};

export default DisplayProperties;
