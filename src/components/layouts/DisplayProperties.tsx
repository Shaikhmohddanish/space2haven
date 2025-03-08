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
        possession, 
        developer,
        recommend,
        url,
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
          possession={possession || "N/A"} // ✅ Handle missing possession
          developer={developer || "N/A"}
          propertyType={propertyType || "N/A"} // ✅ Handle missing property type
          tag={propertyType || "N/A"}
          location={location || "Not specified"} // ✅ Handle missing location
          recommend={recommend ?? false} // ✅ Ensure recommend is always a boolean
          url={url || "N/A"}
          featured={featured ?? false} 
          newProperty={newProperty ?? false} 
          configurations={Array.isArray(configurations) ? configurations : []}  // ✅ Add this line
        />
      ))}
    </div>
  );
};

export default DisplayProperties;
