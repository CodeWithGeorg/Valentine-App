import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - My Valentine Page",
  description: "Our privacy policy and how we protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
                Privacy Policy
              </h1>

              <div className="prose prose-pink max-w-none text-gray-600 space-y-6">
                <p>
                  <strong>Last updated:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Introduction
                </h2>
                <p>
                  Welcome to My Valentine Page. We respect your privacy and are
                  committed to protecting your personal information. This
                  Privacy Policy explains how we collect, use, and share
                  information about you when you use our service.
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Information We Collect
                </h2>
                <p>When you create a Valentine page, we collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your name or nickname (optional)</li>
                  <li>Your Valentine message</li>
                  <li>Anonymous messages sent to your page</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800">
                  How We Use Your Information
                </h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create and display your Valentine page</li>
                  <li>Deliver anonymous messages to the intended recipient</li>
                  <li>Improve our services</li>
                  <li>Respond to your requests</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800">
                  Data Storage
                </h2>
                <p>
                  Your data is stored securely using Supabase (PostgreSQL
                  database). We implement appropriate security measures to
                  protect your personal information.
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  Anonymous Messages
                </h2>
                <p>
                  Anonymous messages are designed to remain anonymous. We do not
                  collect or store IP addresses or any identifying information
                  from message senders.
                </p>

                <h2 className="text-xl font-bold text-gray-800">Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate personal data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us through our app.
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
