"use client";

import React from "react";

const ComparisonTable = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-10 bg-[#FFFBF2]">
      {/* Title */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800">
        What Sets Us Apart?
      </h2>
      <p className="text-center text-gray-500 text-sm md:text-base mt-2">
        Sublime Designs. Prompt Services. Best Results.
      </p>

      {/* Scrollable Table for Mobile */}
      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[1000px] md:w-full mx-auto shadow-lg rounded-lg border border-gray-300 overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-4">
            <div className="bg-gray-50 text-center py-5 px-4 border-r border-gray-300">
              <h3 className="text-gray-600 font-bold text-lg">Category</h3>
            </div>
            <div className="bg-pink-100 text-center py-5 px-4 border-r border-gray-300">
              <h3 className="text-pink-600 font-bold text-lg">Our Experience</h3>
            </div>
            <div className="bg-gray-100 text-center py-5 px-4 border-r border-gray-300">
              <h3 className="text-gray-700 font-bold text-lg">Competitor</h3>
            </div>
            <div className="bg-blue-100 text-center py-5 px-4">
              <h3 className="text-blue-600 font-bold text-lg">Market Standard</h3>
            </div>
          </div>

          {/* Table Rows */}
          {[
            { category: "Solutions", ours: "One-stop destination", competitor: "Multiple intermediaries", market: "Basic service offerings" },
            { category: "Dedicated Team", ours: "Experts with innovative solutions", competitor: "No dedicated team", market: "Limited specialists" },
            { category: "VR Experience", ours: "3D Visual Walkthroughs", competitor: "No advanced tech", market: "Standard design previews" },
            { category: "Quality Assurance", ours: "Regular quality reviews", competitor: "Low-grade materials", market: "Variable standards" },
            { category: "Pricing", ours: "Lowest price guaranteed", competitor: "No price match", market: "Competitive pricing" },
            { category: "Hidden Charges", ours: "No Hidden Costs", competitor: "Unclear costs", market: "Transparent but costly" },
            { category: "Support", ours: "After-sales support", competitor: "No post-completion service", market: "Limited support" }
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-4 border-t border-gray-300 text-center">
              <div className="py-5 px-4 font-medium text-gray-700 border-r border-gray-300 bg-gray-50">
                {item.category}
              </div>
              <div className="py-5 px-4 font-semibold text-gray-800 border-r border-gray-300">
                {item.ours}
              </div>
              <div className="py-5 px-4 text-gray-600 border-r border-gray-300">
                {item.competitor}
              </div>
              <div className="py-5 px-4 text-gray-700">
                {item.market}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6 text-center">
        <button className="bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-pink-700 transition">
          Get Free Consultation
        </button>
      </div>
    </div>
  );
};

export default ComparisonTable;
