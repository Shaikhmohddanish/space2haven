"use client";

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import '../../app/styles/slider.css';

interface Developer {
  id: string;
  name: string;
  logo: string;
  description: string;
  projectCount: number;
  stats: {
    projects: number;
    experience: string;
    rating: number;
  };
  projects: Array<{
    name: string;
    image: string;
  }>;
}

const developers: Developer[] = [
  {
    id: 'lodha',
    name: 'Lodha Group',
    logo: '/images/lodha.png',
    description: 'World-Class Real Estate Developer',
    projectCount: 42,
    stats: {
      projects: 42,
      experience: '25+ Years',
      rating: 4.8
    },
    projects: [
      { name: 'Lodha Park', image: '/projects/lodha-park.jpg' },
      { name: 'Lodha World Towers', image: '/projects/lodha-world.jpg' }
    ]
  },
  {
    id: 'lnt',
    name: 'L&T Realty',
    logo: '/images/lnt.png',
    description: 'Leading Infrastructure & Real Estate Developer',
    projectCount: 25,
    stats: {
      projects: 55,
      experience: '30+ Years',
      rating: 4.9
    },
    projects: [
      { name: 'L&T Seawoods', image: '/projects/lt-seawoods.jpg' },
      { name: 'L&T Emerald Isle', image: '/projects/lt-emerald.jpg' }
    ]
  }
];

const DeveloperSlider = () => {
  return (
    <div className="developer-slider-wrapper">
      <Splide
        options={{
          perPage: 3,
          gap: '2rem',
          arrows: false,
          pagination: true,
          padding: { left: '1rem', right: '1rem' },
          breakpoints: {
            1280: { perPage: 2, gap: '1.5rem' },
            768: { perPage: 1, gap: '1rem' }
          }
        }}
        className="developer-slider py-4"
      >
        {developers.map((developer) => (
          <SplideSlide key={developer.id}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              {/* Header with Logo */}
              <div className="p-6 flex items-center gap-4">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={developer.logo}
                    alt={developer.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {developer.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {developer.description}
                  </p>
                  <p className="text-sm text-purple-600 mt-1">
                    {developer.projectCount} Projects
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="px-6 pb-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {developer.stats.projects}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {developer.stats.experience}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {developer.stats.rating}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Rating</p>
                </div>
              </div>

              {/* Project Images */}
              <div className="grid grid-cols-2 gap-px bg-gray-100">
                {developer.projects.map((project, idx) => (
                  <div key={idx} className="relative aspect-[4/3] bg-white">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent">
                      <p className="absolute bottom-2 left-2 text-white text-sm font-medium">
                        {project.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Projects Button */}
              <div className="p-4 bg-gray-50">
                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[0.98]">
                  View Projects
                </button>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default DeveloperSlider;
