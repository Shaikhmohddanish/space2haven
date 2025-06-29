import { ArrowLeft, FileText, Shield, CheckCircle, AlertTriangle, Users, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function Terms() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section with Banner */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 md:px-8 h-[50vh]">
        <img
          src="/terms/terms-banner.jpg"
          alt="Terms & Conditions - Space2Haven"
          className="object-cover object-center absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay for banner */}
        <div className="absolute inset-0 bg-black/70 md:bg-black/60 lg:bg-black/50 z-0" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Terms & Conditions
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Important terms governing your use of our platform and services.
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
              {/* Acceptance of Terms */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
                    <p className="text-gray-600">
                      By accessing and using Space2Heaven's website and services, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">
                    <strong>Important:</strong> Continued use of our services constitutes acceptance of these terms.
                  </p>
                </div>
              </div>

              {/* Use License */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">2. Use License</h2>
                    <p className="text-gray-600 mb-4">
                      Permission is granted to temporarily access the materials on Space2Heaven's website under specific conditions:
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle size={16} className="text-green-600 shrink-0" />
                      <span className="text-gray-700">Temporary access granted</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle size={16} className="text-green-600 shrink-0" />
                      <span className="text-gray-700">License, not ownership transfer</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle size={16} className="text-red-600 shrink-0" />
                      <span className="text-gray-700">No modification permitted</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle size={16} className="text-red-600 shrink-0" />
                      <span className="text-gray-700">No commercial use allowed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Information */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">3. Property Information</h2>
                    <p className="text-gray-600 mb-4">
                      While we strive to provide accurate property information, we cannot guarantee the accuracy of all details.
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-yellow-800 font-medium mb-1">Verification Required</p>
                      <p className="text-yellow-700">Users should independently verify all property information before making decisions.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">4. User Responsibilities</h2>
                    <p className="text-gray-600 mb-4">
                      As a user of our platform, you agree to:
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></div>
                      <span className="text-gray-700">Provide accurate personal information</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></div>
                      <span className="text-gray-700">Maintain account confidentiality</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></div>
                      <span className="text-gray-700">Comply with applicable laws</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></div>
                      <span className="text-gray-700">Avoid unauthorized use</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">5. Limitation of Liability</h2>
                    <p className="text-gray-600 mb-4">
                      Space2Heaven shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                    </p>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">
                    <strong>Disclaimer:</strong> We provide our services "as is" without warranties of any kind, either express or implied.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">6. Changes to Terms</h2>
                    <p className="text-gray-600">
                      We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date of these terms.
                    </p>
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <p className="text-indigo-800">
                    <strong>Notification:</strong> Continued use after changes constitutes acceptance of modified terms.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h2 className="text-2xl font-semibold mb-4">Questions About These Terms?</h2>
                <p className="mb-4">
                  If you have any questions about these Terms & Conditions, please don't hesitate to reach out to us.
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
