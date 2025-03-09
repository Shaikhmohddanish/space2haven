"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const projects = [
  {
    title: "Shiv Shree Aangan",
    location: "Panvel, Mumbai",
    bhk: "1 & 2 BHK",
    price: "INR 26.0 Lacs",
    image: "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/148138/original/shivg.png",
    url: "/projects/shiv-shree-aangan-panvel-pid-19315",
    verified: true,
  },
  {
    title: "Siddhivinayak Vrundavan",
    location: "Panvel, Mumbai",
    bhk: "1 & 2 BHK",
    price: "INR 70.0 Lacs",
    image: "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/148137/original/s.png",
    url: "/projects/siddhivinayak-vrundavan-panvel-pid-19314",
    verified: true,
  },
  {
    title: "Yashashree Ashtavinayak Darshan",
    location: "Dombivali East, Mumbai",
    bhk: "1 & 2 BHK",
    price: "INR 54.15 Lacs",
    image: "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/148135/original/kkk.png",
    url: "/projects/yashashree-ashtavinayak-darshan-dombivali-east-pid-19313",
    verified: true,
  },
  {
    title: "Sadguru Trimurti",
    location: "Borivali West, Mumbai",
    bhk: "2 & 3 BHK",
    price: "Price on request",
    image: "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/148133/original/tr.png",
    url: "/projects/sadguru-trimurti-borivali-west-pid-19312",
    verified: true,
  },
];

const NewProjects: React.FC = () => {
  return (
    <section className="newProjects px-4 py-6 bg-white w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">New Projects in Mumbai</h2>
          <a
            href="/mumbai/buy/new-projects-in-mumbai?&sortKey=created_at&sortDir=desc"
            className="text-blue-500 hover:underline text-sm"
          >
            View All
          </a>
        </div>

        <Splide
          options={{
            perPage: 3,
            gap: "1rem",
            arrows: true,
            pagination: false,
            padding: "1rem",
            breakpoints: {
              1024: {
                perPage: 2,
                gap: "0.75rem",
              },
              768: {
                perPage: 2,
                gap: "0.5rem",
              },
              480: {
                perPage: 1,
                gap: "0.5rem",
                padding: "0.5rem",
              },
            },
          }}
          className="w-full"
        >
          {projects.map((project, index) => (
            <SplideSlide key={index}>
              <div className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:scale-105">
                <a href={project.url}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{project.bhk} Apartment</p>
                  <p className="text-gray-600 text-sm truncate">{project.location}</p>
                  <p className="text-green-600 font-bold">{project.price}</p>
                  {project.verified && (
                    <div className="text-xs text-green-500 flex items-center mt-2">
                      <img
                        src="/images/rera-icon-verified.svg"
                        alt="RERA Verified"
                        className="w-4 h-4 mr-1"
                      />
                      RERA Verified
                    </div>
                  )}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default NewProjects;
