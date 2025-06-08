'use client'

import Image from "next/image"
import DialogForm from "./DialogForm"

const GetInTouchForm = ({ pageType }: { pageType?: string }) => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12">
          {/* Left Section with Image and Content */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-purple-600 to-purple-700 h-full min-h-[400px] flex flex-col justify-between p-6 sm:p-8 md:p-10 text-white">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="/images/pattern2.png"
                  alt="Background Pattern"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* Content */}
              <div className="relative space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
                  Let's Connect
                </h2>
                <p className="text-base sm:text-lg text-purple-100 leading-relaxed max-w-lg">
                  Ready to start your real estate journey? Our expert team is here to guide you every step of the way.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 py-4 sm:py-6">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                      500+
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-purple-100">
                      Happy Clients
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                      1000+
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-purple-100">
                      Properties Listed
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="relative mt-6 sm:mt-8">
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Expert property consultation",
                    "24/7 dedicated support",
                    "Verified property listings",
                    "Best market prices"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-purple-300 rounded-full transition-transform group-hover:scale-125" />
                      <span className="text-sm sm:text-base text-purple-100 group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-purple-500/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
            </div>
          </div>

          {/* Right Section with Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Get in Touch
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                {/* Form */}
                <DialogForm />

                {/* Trust Badges */}
                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                    {[
                      { text: "SSL Secured", color: "bg-green-500" },
                      { text: "Privacy Protected", color: "bg-blue-500" },
                      { text: "24/7 Support", color: "bg-purple-500" }
                    ].map((badge, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 ${badge.color} rounded-full`} />
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                          {badge.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                    Your information is secure and encrypted, we'll never share your data with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouchForm
