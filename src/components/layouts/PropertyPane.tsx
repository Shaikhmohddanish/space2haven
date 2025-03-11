"use client";

import { useEffect, useState } from "react";
import { Property, PropertyPaneProps } from "@/types";
import axios from "axios";
import { DynamicCarousel } from "..";
import { interiorDesign } from "@/constants/sampleData";
import { contentStyles } from "@/constants";
import ImageSlider from "./ImageSlider";

const PropertyPane: React.FC<PropertyPaneProps> = ({ contentType }) => {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contentType === "home-properties") {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get<Property[]>("/api/properties");
          setData(response?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [contentType]);

  const {
    title,
    titleColor,
    hrColor,
    description,
    descriptionColor,
  } = contentStyles[contentType as keyof typeof contentStyles] || contentStyles["home-properties"];

  return (
    <section
      className={`section-general-class ${contentType === "home-properties"
        ? "bg-home" :
        contentType === "home-interior" || contentType === "interior"
          ? "bg-transparent" :
          contentType === "interior-self-intro"
            ? "bg-interior"
            : "bg-home"
        }`}
    >
      {/* Header and Description */}
      <div className="flex-center gap-4 flex-col mb-6 lg:mb-10">
        <h1 className={`header-class ${titleColor}`}>{title}</h1>
        <hr className={hrColor} />
        <p
          className={`text-sm md:text-base lg:text-lg max-w-xl mx-auto text-center ${descriptionColor}`}
        >
          {description}
        </p>
      </div>
      {/* Carousel */}
      <DynamicCarousel
        data={
          contentType === "home-properties"
            ? data
            : interiorDesign.flatMap((obj) => Object.values(obj))
        }
        loading={contentType === "home-properties" ? loading : false}
        type={contentType}
      />
    </section>
  );
};

export default PropertyPane;
