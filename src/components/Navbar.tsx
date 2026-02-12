"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="heart"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              My Valentine
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              Create Page
            </Link>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
