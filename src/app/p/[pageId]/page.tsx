"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ValentinePage, themes } from "@/types";
import { getValentinePage } from "@/lib/supabase";
import MessageForm from "@/components/MessageForm";

interface PublicPageProps {
  params: Promise<{ pageId: string }>;
}

export default function PublicPage({ params }: PublicPageProps) {
  const [pageId, setPageId] = useState<string>("");
  const [page, setPage] = useState<ValentinePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      setPageId(resolvedParams.pageId);
      loadPage(resolvedParams.pageId);
    });
  }, [params]);

  const loadPage = async (id: string) => {
    try {
      const pageData = await getValentinePage(id);
      setPage(pageData);
    } catch (err) {
      console.error("Error loading page:", err);
      setError("Page not found 😔");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSent = () => {
    setMessageSent(true);
    // Reset after 5 seconds
    setTimeout(() => setMessageSent(false), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-6xl"
        >
          💕
        </motion.div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md"
        >
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            This Valentine page doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          >
            Create Your Own Page 💕
          </Link>
        </motion.div>
      </div>
    );
  }

  const theme = themes[page.theme] || themes["romantic-red"];

  return (
    <div className="min-h-screen">
      {/* Dynamic background based on theme */}
      <div
        className={`fixed inset-0 bg-gradient-to-br ${theme.gradient} opacity-90`}
      />

      {/* Floating hearts background */}
      <div className="hearts-bg">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="heart-float text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <span className="text-xl">🏠</span>
            <span className="font-medium">Create Your Own</span>
          </Link>
        </header>

        {/* Valentine Card */}
        <main className="flex-grow flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-full max-w-2xl"
          >
            {/* Envelope effect */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-4"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block text-6xl"
              >
                💌
              </motion.div>
            </motion.div>

            {/* Main Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div
                className={`bg-gradient-to-r ${theme.gradient} p-8 text-center`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-block mb-4"
                >
                  <div className="heart w-16 h-16" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl sm:text-4xl font-bold text-white mb-2"
                >
                  💕 A Valentine Message For You! 💕
                </motion.h1>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-6"
                >
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                    From
                  </p>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                    {page.name}
                  </h2>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 mb-8"
                >
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center font-medium italic">
                    "{page.message}"
                  </p>
                </motion.div>

                {/* Message Form */}
                {!messageSent ? (
                  <MessageForm pageId={page.id} onSuccess={handleMessageSent} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center"
                  >
                    <div className="text-5xl mb-3">🎉</div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Your anonymous message has been delivered! 💕
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-8 py-4 text-center">
                <p className="text-sm text-gray-400">
                  Made with 💕 by{" "}
                  <span className="font-medium">{page.name}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center">
          <p className="text-white/60 text-sm">
            Valentine's Week {new Date().getFullYear()} ❤️
          </p>
        </footer>
      </div>
    </div>
  );
}
