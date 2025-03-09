"use client";  // This MUST be the first line

import { useState } from "react";
import Pattern from "./Pattern";

const WhoWeAre = () => {
  const [showMore, setShowMore] = useState(false);

  // Description text
  const fullText = `
    At Space2Heaven, we are committed to transforming your property aspirations into reality. With a diverse portfolio of premium properties and interior solutions, we offer comprehensive services that cater to every need of modern homeowners. Our team of experienced professionals ensures that every step of your journey—from finding your dream home to designing the perfect interiors—is seamless and satisfying.
    
    Our goal is not just to provide properties but to deliver an unmatched lifestyle experience. We believe in a customer-first approach, ensuring transparency, quality, and integrity in every deal. Join us at Space2Heaven and experience the difference of working with a trusted partner who values your dreams as much as you do.
  `;

  // Handle show more logic
  const truncatedText = fullText.slice(0, 200) + "...";
  const displayText = showMore ? fullText : truncatedText;

  return (
    <section className="section-general-class relative bg-gradient-to-b from-home to-gray-800 min-h-screen py-2">
      <Pattern />

      <div className="relative z-10 flex flex-col items-center py-2 px-4 md:px-8 lg:px-16 gap-2 w-full max-w-6xl mx-auto">
        
        {/* Centered Title and HR */}
        <div className="text-center w-full mb-2">
          <h1 className="text-sand-soft2 text-3xl md:text-4xl lg:text-5xl font-bold mb-1">
            Who We Are
          </h1>
          <hr className="bg-sand-soft2 mb-2 w-1/3 mx-auto" />
        </div>

        {/* Left-Aligned Content */}
        <div className="text-left w-full">
          <p className="text-sand-soft2 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl">
            {displayText}
          </p>

          {/* Show More Button */}
          {fullText.length > 200 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-home font-bold mt-1 hover:underline"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
