import { ServiceSectionProps } from "@/types";
import ServiceCard from "./ServiceCard";

const TipsAndGuide = ({ 
  title, 
  data, 
  subtitle,
  bgClassName = "bg-gradient-to-b from-home to-gray-800" 
}: ServiceSectionProps) => {
  return (
    <section
    className="w-full lightgray bg-cover bg-center px-6 md:px-12 py-4 md:py-6"
    >
      {/* Section Content */}
      <div className="relative z-10 flex flex-col items-center gap-0 w-full">
      
        {/* Header */}
      <div className="flex-center gap-2 flex-col mb-6">
      <h1 className={`header-class text-black`}>{title}</h1>
      <p className="text-black text-lg md:text-xl text-center">
          {subtitle}
      </p>
      <hr className='darkBrown' />
      </div>

        {/* Services Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-0 mx-auto">
          {data.map((service, index) => (
            <ServiceCard
              key={index}
              imageSrc={service.imageSrc}
              title={service.title}
              url={service.url}
              className="flex flex-col items-center justify-center rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 p-2 m-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsAndGuide;
