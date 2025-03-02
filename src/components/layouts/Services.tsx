import FormDialogBox from "./DialogBox";
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
      className={`section-general-class relative ${bgClassName} min-h-screen`}
    >
      {/* Background Pattern */}
      <Pattern />

      {/* Section Content */}
      <div className="relative z-10 flex flex-col items-center py-8 px-4 md:px-8 lg:px-16 gap-8 w-full">
        {/* Section Header */}
        <h1 className="text-sand-soft2 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          {title}
        </h1>
        <hr className="bg-sand-soft2" />

        {/* Services Grid */}
        <div className="w-full max-w-7xl flex flex-wrap justify-center gap-8">
  {data.map((service, index) => (
    <ServiceCard
      key={index}
      imageSrc={service.imageSrc}
      title={service.title}
      url={service.url}
    />
  ))}
</div>


        {/* Dialog Box */}
        <FormDialogBox />
      </div>
    </section>
  );
};

export default Services;
