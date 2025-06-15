import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyCardProps } from '@/types';

const PropertyCard = React.memo(({ id, imageSrc, price, features, configuration, tag, location, propertyType, recommend }: PropertyCardProps) => {
    return (
        <Link href={`/properties/${id}`} className="property-card-styles">

            {/* Tag on top of the image */}
            {recommend && (
                <div className="property-card-tag">
                    Recommended
                </div>
            )}

            {/* Image */}
            <div className="w-full h-full relative">
                <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading='lazy'
                    src={imageSrc}
                    alt={tag}
                    fill
                    priority={false}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="property-card-content">
                <h2 className="text-lg font-bold">
                    ₹ {price} | {configuration.join(",")}
                </h2>
                <p className=" text-sm mt-1">Location: {location}</p>
            </div>
        </Link>
    );
});
PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
