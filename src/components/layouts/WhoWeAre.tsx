"use client";

import { useState } from "react";
import { contentStyles } from "@/constants";

const WhoWeAre: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `
    At Space2Heaven, we are committed to transforming your property aspirations into reality. With a diverse portfolio of premium properties and interior solutions, we offer comprehensive services that cater to every need of modern homeowners. Our team of experienced professionals ensures that every step of your journey—from finding your dream home to designing the perfect interiors—is seamless and satisfying.\n
    Our goal is not just to provide properties but to deliver an unmatched lifestyle experience. We believe in a customer-first approach, ensuring transparency, quality, and integrity in every deal. Join us at Space2Heaven and experience the difference of working with a trusted partner who values your dreams as much as you do.
  `;

  const previewText = fullText.slice(0, 350) + (fullText.length > 350 ? "..." : "");
  const isLongText = fullText.length > 350;

  const { title, titleColor, hrColor, descriptionColor } = contentStyles["who-we-are"];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section
      className="w-full bg-[url(/images/pattern.png)] bg-interior bg-cover bg-center px-6 md:px-12 py-4 md:py-6 relative z-10"
    >
      {/* Header */}
      <div className="flex-center gap-4 flex-col mb-4">
        <h1 className={`header-class ${titleColor}`}>{title}</h1>
        <hr className={hrColor} />
      </div>

      {/* Description */}
      <div className="max-w-5xl mx-auto text-left px-4 md:px-6 mb-2">
        <div
          className={`text-lg md:text-xl  ${descriptionColor} whitespace-pre-line transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-full" : "max-h-[180px] overflow-hidden"
          }`}
        >
          {isExpanded ? fullText : previewText}
        </div>

        {/* See More / See Less Toggle */}
        {isLongText && (
          <button
            onClick={handleToggle}
            className="mt-2 text-primary hover:underline transition-all duration-200 focus:outline-none active:scale-95 block mx-auto"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </section>
  );
};

export default WhoWeAre;
