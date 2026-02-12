import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service - My Valentine Page",
  description: "Our terms of service and usage guidelines.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
                Terms of Service
              </h1>

              <div className="prose prose-pink max-w-none text-gray-600 space-y-6">
                <p>
                  <strong>Last updated:</strong> Feb 12, 2026
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing and using My Valentine Page, you accept and agree
                  to be bound by these Terms of Service. If you do not agree to
                  these terms, please do not use our service.
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Description of Service
                </h2>
                <p>
                  My Valentine Page is a web application that allows users to
                  create personalized Valentine's Day pages and receive
                  anonymous messages from friends, crushes, or secret admirers.
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  User Conduct
                </h2>
                <p>By using our service, you agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Send harassing, threatening, or offensive messages</li>
                  <li>
                    Send messages that contain hate speech or discrimination
                  </li>
                  <li>Send messages that promote violence or self-harm</li>
                  <li>Attempt to spam or overload the system</li>
                  <li>Use the service for any illegal activities</li>
                  <li>
                    Attempt to collect or store personal information of others
                  </li>
                  <li>Create pages with false or misleading information</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800">
                  Content Moderation
                </h2>
                <p>We reserve the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remove any content that violates these terms</li>
                  <li>Block users who violate these terms</li>
                  <li>Report illegal content to authorities</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800">
                  Intellectual Property
                </h2>
                <p>
                  The My Valentine Page name, logo, and all related trademarks
                  are the property of My Valentine Page. You may not use our
                  trademarks without our written permission.
                </p>

                <h2 className="text-xl font-bold text-gray-800">Disclaimer</h2>
                <p>
                  My Valentine Page is provided "as is" without any warranties,
                  expressed or implied. We do not guarantee that the service
                  will be available at all times or that messages will be
                  delivered.
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Limitation of Liability
                </h2>
                <p>
                  My Valentine Page shall not be liable for any indirect,
                  incidental, or consequential damages arising out of the use of
                  our service.
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms of Service at any
                  time. Continued use of the service after any changes
                  constitutes acceptance of the new terms.
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Governing Law
                </h2>
                <p>
                  These Terms of Service shall be governed by and construed in
                  accordance with applicable laws.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href="/"
                    className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
