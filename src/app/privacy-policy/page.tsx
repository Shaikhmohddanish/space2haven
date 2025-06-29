import { ArrowLeft, Shield, Lock, Eye, FileText, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section with Banner */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 md:px-8 h-[50vh]">
        <img
          src="/privacy/privacy-banner.jpg"
          alt="Privacy Policy - Space2Haven"
          className="object-cover object-center absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay for banner */}
        <div className="absolute inset-0 bg-black/70 md:bg-black/60 lg:bg-black/50 z-0" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Your privacy matters to us. Learn how we protect and handle your data.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 group transition-colors"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Last Updated Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center gap-3">
              <Clock className="text-blue-600" size={20} />
              <p className="text-blue-800">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="grid gap-8">
              {/* Information We Collect */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Information We Collect</h2>
                    <p className="text-gray-600">
                      At Space2Heaven, we collect information to provide better services to our users. The types of information we collect include:
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Name and contact details</li>
                      <li>• Email address and phone number</li>
                      <li>• Property preferences</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Usage Data</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Search history and preferences</li>
                      <li>• Device and browser information</li>
                      <li>• Analytics and usage patterns</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">How We Use Your Information</h2>
                    <p className="text-gray-600 mb-4">
                      We use the collected information for various purposes to enhance your experience:
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Provide and maintain our services</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Send service notifications</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Provide customer support</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Improve our services</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Security */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Information Security</h2>
                    <p className="text-gray-600 mb-4">
                      We value your trust in providing us your personal information, and we strive to use commercially acceptable means of protecting it.
                    </p>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-800">
                    <strong>Note:</strong> No method of transmission over the internet or electronic storage is 100% secure. While we implement industry-standard security measures, we cannot guarantee absolute security.
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Cookies & Tracking</h2>
                    <p className="text-gray-600 mb-4">
                      We use cookies and similar tracking technologies to enhance your browsing experience and analyze usage patterns.
                    </p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-orange-800">
                    Cookies are small data files stored on your device that help us remember your preferences and improve our services. You can manage cookie preferences through your browser settings.
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Changes to This Policy</h2>
                    <p className="text-gray-600">
                      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h2 className="text-2xl font-semibold mb-4">Questions About This Policy?</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please don't hesitate to contact us.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Contact Us
                  <ArrowLeft size={16} className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
