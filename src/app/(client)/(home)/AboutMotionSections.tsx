"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Star } from "lucide-react";

export default function AboutMotionSections() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-blue-600/80 to-purple-600/80">
        <Image
          src="/about/about-hero.jpg"
          alt="Space2Haven Mumbai real estate"
          fill
          className="object-cover object-center absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay for banner */}
        <div className="absolute inset-0 bg-black/70 md:bg-black/60 lg:bg-black/50 z-0" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            About Space2Haven
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-medium">
            Your trusted partner for buying, selling, and renting properties in Mumbai, Maharashtra, and beyond.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="small" className="bg-white text-blue-700 hover:bg-blue-100 font-semibold px-6 py-3 text-base shadow-md">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Story & Approach Section */}
      <section className="container mx-auto max-w-5xl py-12 md:py-16 px-4 md:px-0">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-purple-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
            </div>
            <p className="text-gray-700 text-base md:text-lg">
              Space2Haven is a leading real estate platform dedicated to making property transactions seamless and transparent. Based in Mumbai, we specialize in residential and commercial property sales, rentals, and investments across Maharashtra, with plans to expand nationwide.
            </p>
            <p className="text-gray-700 text-base md:text-lg">
              Our team combines deep local expertise with a customer-first approach, ensuring you find the perfect property or the right buyer/tenant with ease and confidence.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/about/about-hero.jpg"
              alt="Space2Haven Mumbai real estate office"
              width={800}
              height={600}
              className="h-56 w-full object-cover sm:h-72 md:h-96"
              priority
            />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center mt-16">
          <div className="overflow-hidden rounded-xl shadow-lg order-2 md:order-1">
            <Image
              src="/about/portfolio-2.jpg"
              alt="Our real estate process"
              width={800}
              height={600}
              className="h-56 w-full object-cover sm:h-72 md:h-96"
              priority
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-blue-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-base md:text-lg">
              To empower buyers, sellers, and renters with the most trusted property solutions, leveraging technology and local knowledge for a smooth, stress-free experience.
            </p>
            <p className="text-gray-700 text-base md:text-lg">
              Whether you are looking for your dream home, a smart investment, or a reliable tenant, Space2Haven is here to guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white/80 py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Alexandra Reynolds",
                role: "Principal Designer & Founder",
                image: "/about/testimonial-1.jpg",
              },
              {
                name: "Marcus Chen",
                role: "Senior Interior Designer",
                image: "/about/testimonial-3.jpg",
              },
              {
                name: "Sophia Williams",
                role: "Project Manager",
                image: "/about/testimonial-1.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center group"
              >
                <div className="overflow-hidden rounded-full w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] mb-4 border-4 border-blue-100 group-hover:border-blue-400 transition-colors">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-3xl px-4 md:px-0 text-center">
          <div className="inline-block bg-white rounded-xl shadow-lg px-8 py-8">
            <p className="text-xl md:text-2xl text-gray-700 font-medium mb-4">
              “Space2Haven turned our house into a home. Their attention to detail and creative vision exceeded our expectations!”
            </p>
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/about/testimonial-1.jpg"
                alt="Client testimonial"
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-blue-200 w-16 h-16"
                style={{ aspectRatio: '1 / 1' }}
              />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Priya Sharma</div>
                <div className="text-xs text-gray-500">Homeowner, Mumbai</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
