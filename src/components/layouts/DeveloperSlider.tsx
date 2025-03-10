import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';

const developers = [
  {
    name: 'L&T Realty',
    logo: '/images/lnt.jpg',
    link: '#'
  },
  {
    name: 'Godrej Properties',
    logo: '/images/godrej.jpg',
    link: '#'
  },
  {
    name: 'Piramal Realty',
    logo: '/images/piramal.png',
    link: '#'
  },
  {
    name: 'Mahindra Lifespaces',
    logo: '/images/mahindra.png',
    link: '#'
  },
  {
    name: 'Lodha Group',
    logo: '/images/lodha_group.png',
    link: '#'
  },
];

const DeveloperSlider: React.FC = () => {
  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-darkBrown">
        Top developers under one roof
      </h2>
      <Splide
        options={{
          type: 'loop',
          perPage: 3,
          perMove: 1,
          gap: '1rem',                    // Consistent gap between cards
          autoplay: true,
          pauseOnHover: true,
          arrows: true,
          pagination: false,
          padding: '1rem',                // Padding inside slider
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 1, gap: '1rem', padding: '1rem' }, // 2 cards per view on tablet
            640: { perPage: 1, gap: '0.5rem', padding: '1rem' }, // 2 cards per view on mobile
          },
        }}
        className="px-2"
      >
        {developers.map((developer, index) => (
          <SplideSlide key={index}>
            <a href={developer.link} className="block group">
              <div className="border border-gray-200 rounded-lg p-2 transition-shadow duration-300 hover:shadow-lg bg-white h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 flex flex-col justify-center items-center mx-auto">
                <div className="flex justify-center mb-2 h-20 w-20 sm:h-24 sm:w-24">
                  <Image
                    src={developer.logo}
                    alt={developer.name}
                    width={80}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-center text-darkBrown text-xs sm:text-sm font-medium group-hover:text-primary transition-colors truncate">
                  {developer.name} <span className="text-orange-500">→</span>
                </h3>
              </div>
            </a>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default DeveloperSlider;
