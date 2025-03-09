import Image from "next/image";
import Link from "next/link";
import { ServiceCardProps } from "@/types";

const ServiceCard = ({ imageSrc, title, url = "/", className = "" }: ServiceCardProps) => (
  <Link
    href={url}
    className={`flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${className}`}
  >
    <h2 className="text-lg lg:text-xl font-semibold text-home mb-4">{title}</h2>
    <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36">
      <Image
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="eager"
        src={imageSrc}
        alt={title}
        width={200}
        height={200}
        className="w-full h-full rounded-md object-contain"
      />
    </div>
  </Link>
);

export default ServiceCard;
