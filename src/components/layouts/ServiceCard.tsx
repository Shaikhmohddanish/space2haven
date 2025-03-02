import Image from "next/image";
import Link from "next/link";
import { ServiceCardProps } from "@/types";

const ServiceCard = ({ imageSrc, title, url = "/" }: ServiceCardProps) => (

  <Link href={url} className="flex-grow flex-center flex-col bg-sand-soft p-4 rounded-lg shadow-lg gap-3">
    <h2 className="text-lg lg:text-xl font-semibold text-home">{title}</h2>
    <div className="flex-shrink w-full md:w-1/2 xl:w-full h-16 md:h-20">
      <Image 
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 
loading='eager'
        src={imageSrc}
        alt={title}
        width={200}
        height={200}
        className="w-full h-full rounded-md object-contain"
      />
    </div>
  </Link>
);
export default ServiceCard