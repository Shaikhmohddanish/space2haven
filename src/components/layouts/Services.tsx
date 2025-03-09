import { ServiceSectionProps } from "@/types";
import ServiceCard from "./ServiceCard";
import Pattern from "./Pattern";

const Services = ({ 
  title, 
  data, 
  bgClassName = "bg-gradient-to-b from-home to-gray-800" 
}: ServiceSectionProps) => {
  return (
    <section
      className={`section-general-class relative ${bgClassName} min-h-[80vh] py-2`}
    >
      {/* Background Pattern */}
      <Pattern />

      {/* Section Content */}
      <div className="relative z-10 flex flex-col items-center gap-0 w-full">
        
        {/* Section Header */}
        <h1 className="text-sand-soft2 text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-1">
          {title}
        </h1>
        <p className="text-sand-soft2 text-lg md:text-xl text-center mb-1">
          We're good at our services
        </p>
        <hr className="bg-sand-soft2 w-1/2 h-px mb-2" />

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

export default Services;
