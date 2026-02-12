"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="heart" />
              <span className="text-lg font-bold">My Valentine</span>
            </div>
            <p className="text-pink-100 text-sm">
              Express your love anonymously ❤️
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-pink-200 transition-colors">
              Home
            </Link>
            <Link
              href="/privacy"
              className="hover:text-pink-200 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-pink-200 transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-200 transition-colors"
            >
              Share ❤️
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 pt-6 text-center text-sm text-pink-100">
          <p>Made with 💕 for Valentine's Week</p>
          <p className="mt-1 text-xs opacity-75">
            © {new Date().getFullYear()} My Valentine Page. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
