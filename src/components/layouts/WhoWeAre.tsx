"use client";

import { useState, useEffect } from "react";
import { contentStyles } from "@/constants";

const WhoWeAre: React.FC = () => {
  const fullText = `
    At Space2Haven, we help people buy the perfect property so we can design it into a dream home. We know that finding a property in Mumbai, Thane, or Navi Mumbai isn’t just about location—it involves negotiations, legal paperwork, construction challenges, and ultimately, creating a dream space that reflects your lifestyle. That’s why we provide a complete, end-to-end service, ensuring a hassle-free journey from house hunting to home styling.
    Whether you're searching for a home, investment property, or expert guidance in transforming your space, we take care of everything. With our expertise in real estate and home design, you don’t just buy a property—you step into a thoughtfully designed, ready-to-live space. Our goal is simple: Helping you buy, so we can design!`;

  const { title, titleColor, hrColor, descriptionColor } = contentStyles["who-we-are"];

  // State to manage showing full text or truncated text
  const [showFullText, setShowFullText] = useState(false);

  // State to track if component has mounted to fix hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true only on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render nothing on the first pass to avoid hydration mismatch
    return null;
  }

  return (
    <section className="w-full lightGray bg-cover bg-center px-6 md:px-12 py-4 md:py-6 relative z-10">
      {/* Header */}
      <div className="flex-center gap-4 flex-col mb-4">
        <h1 className={`header-class text-black`}>{title}</h1>
        <hr className={`text-black`} />
      </div>

      {/* Description with See more / Show less */}
      <div className={`${descriptionColor} text-black leading-relaxed`}>
        {fullText.length > 450 ? (
          <>
            <div
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: showFullText
                  ? fullText.replace(/\n/g, "<br>").replace(/\r/g, "")
                  : `${fullText.slice(0, 450).replace(/\n/g, "<br>").replace(/\r/g, "")}...`,
              }}
            />
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-black ml-2 underline transition"
            >
              {showFullText ? "Show less" : "See more"}
            </button>
          </>
        ) : (
          <p className="whitespace-pre-line">{fullText}</p>
        )}
      </div>
    </section>
  );
};

export default WhoWeAre;
