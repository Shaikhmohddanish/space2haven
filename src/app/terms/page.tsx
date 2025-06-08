import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using Space2Heaven's website and services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Permission is granted to temporarily access the materials on Space2Heaven's website.</li>
                  <li>This is the grant of a license, not a transfer of title.</li>
                  <li>You may not modify or copy the materials.</li>
                  <li>You may not use the materials for any commercial purpose.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Property Information</h2>
                <p className="text-gray-600 mb-4">
                  While we strive to provide accurate property information, we cannot guarantee the accuracy of all details. Users should independently verify all information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate personal information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Use the service in compliance with applicable laws</li>
                  <li>Not engage in any unauthorized use of the service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  Space2Heaven shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date of these terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
