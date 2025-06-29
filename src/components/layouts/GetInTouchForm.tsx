'use client'

import Image from "next/image"
import DialogForm from "./DialogForm"

const GetInTouchForm = ({ pageType }: { pageType?: string }) => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-0 lg:gap-8">
          {/* Left Section with Image and Content */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-xl h-auto lg:h-full shadow-b-none lg:shadow-xl">
              {/* Background Image */}
              <div className="relative h-64 sm:h-72 lg:h-full lg:min-h-[450px]">
                <Image
                  src="/images/contactus.png"
                  alt="Real Estate Consultation"
                  fill
                  className="object-cover"
                  priority={false}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 text-white">
                {/* Top Content - Hidden on mobile for cleaner look */}
                <div className="pt-2 hidden sm:block">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 inline-block">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                      Let's Connect
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-200">
                      Your Dream Home Awaits
                    </p>
                  </div>
                </div>

                {/* Bottom Content - Optimized for mobile */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Mobile-first header */}
                  <div className="sm:hidden mb-2">
                    <h2 className="text-xl font-bold mb-1">Let's Connect</h2>
                    <p className="text-sm text-gray-200">Your Dream Home Awaits</p>
                  </div>

                  <p className="text-sm sm:text-sm text-gray-200 leading-relaxed bg-black/40 backdrop-blur-sm rounded-lg p-3">
                    Ready to start your real estate journey? Our expert team is here to guide you every step of the way.
                  </p>
                  
                  {/* Stats - Simplified for mobile */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                      <div className="text-lg sm:text-xl font-bold">
                        50+
                      </div>
                      <div className="text-xs text-gray-300">
                        Happy Clients
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                      <div className="text-lg sm:text-xl font-bold">
                        1000+
                      </div>
                      <div className="text-xs text-gray-300">
                        Properties
                      </div>
                    </div>
                  </div>

                  {/* Features - Simplified for mobile */}
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 space-y-2">
                    <h4 className="text-sm font-semibold text-white">Why Choose Us?</h4>
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-gray-200">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                        <span className="truncate">Expert Guidance</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="truncate">Legal Support</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                        <span className="truncate">Best Prices</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span className="truncate">Quick Process</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section with Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-b-2xl lg:rounded-2xl lg:shadow-xl p-4 sm:p-5 md:p-6 lg:p-7 relative overflow-hidden -mt-1 lg:mt-0 shadow-lg lg:shadow-xl">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1.5">
                    Get in Touch
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                {/* Form */}
                <DialogForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouchForm
