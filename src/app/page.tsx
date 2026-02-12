"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageForm from "@/components/PageForm";

// Generate consistent random values on the client only
function useFloatingHearts(count: number) {
  const [hearts, setHearts] = useState<
    Array<{ left: string; duration: string; delay: string }>
  >([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${Math.random() * 10}s`,
    }));
    setHearts(newHearts);
  }, [count]);

  return hearts;
}

export default function Home() {
  const [createdPageId, setCreatedPageId] = useState<string | null>(null);
  const [creatorName, setCreatorName] = useState<string>("");
  const [creatorMessage, setCreatorMessage] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");

  // Get the real origin once on the client (prevents localhost in production)
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleSuccess = (pageId: string, name: string, message: string) => {
    setCreatedPageId(pageId);
    setCreatorName(name);
    setCreatorMessage(message);

    // Scroll to share section
    setTimeout(() => {
      document.getElementById("share-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Build share URLs using the origin we safely fetched
  const shareUrl =
    createdPageId && origin
      ? `${origin}/p/${createdPageId}?name=${encodeURIComponent(creatorName)}`
      : "";

  const adminUrl =
    createdPageId && origin
      ? `${origin}/admin/${createdPageId}?name=${encodeURIComponent(creatorName)}`
      : "";

  const copyToClipboard = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert("Link copied to clipboard! 📋");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {!createdPageId ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Hero + Form + How it Works - unchanged */}
                  <div className="text-center mb-10">
                    <motion.h1
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 bg-clip-text text-transparent mb-4"
                    >
                      💕 My Valentine Page 💕
                    </motion.h1>
                    <motion.p
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                      Create a personalized Valentine page and share it with
                      your special someone. Receive anonymous love messages from
                      friends, crushes, or secret admirers!
                    </motion.p>
                  </div>

                  <PageForm onSuccess={handleSuccess} />

                  {/* How it Works Section - unchanged */}
                  <motion.div
                    id="how-it-works"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-20"
                  >
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                      How It Works ✨
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          icon: "📝",
                          title: "1. Create Your Page",
                          desc: "Fill in your name and a sweet message",
                        },
                        {
                          icon: "🔗",
                          title: "2. Share the Link",
                          desc: "Share your unique link with friends",
                        },
                        {
                          icon: "💌",
                          title: "3. Receive Messages",
                          desc: "Get anonymous love messages in your inbox",
                        },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="text-center bg-white rounded-2xl p-6 shadow-lg"
                        >
                          <span className="text-5xl mb-4 block">
                            {step.icon}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-500">{step.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-8xl mb-6"
                  >
                    🎉
                  </motion.div>

                  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
                    Your Valentine Page is Ready!
                  </h1>

                  <p className="text-xl text-gray-600 mb-8">
                    Share this link with your friends, crush, or that special
                    someone!
                  </p>

                  <div
                    id="share-section"
                    className="max-w-2xl mx-auto space-y-6"
                  >
                    {/* Public Link */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="bg-white rounded-2xl p-6 shadow-xl"
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <span className="mr-2">🌹</span>
                        Public Valentine Page Link
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          readOnly
                          value={shareUrl}
                          className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 font-mono text-sm"
                        />
                        <motion.button
                          onClick={() => copyToClipboard(shareUrl)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                        >
                          <span className="mr-2">📋</span>
                          Copy
                        </motion.button>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Share this link so others can send you anonymous
                        messages!
                      </p>
                    </motion.div>

                    {/* Admin Link */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 shadow-xl text-white"
                    >
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <span className="mr-2">🔐</span>
                        Private Admin Link (Save This!)
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          readOnly
                          value={adminUrl}
                          className="flex-1 px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white font-mono text-sm"
                        />
                        <motion.button
                          onClick={() => copyToClipboard(adminUrl)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                        >
                          <span className="mr-2">🔗</span>
                          Copy
                        </motion.button>
                      </div>
                      <p className="text-sm text-purple-100 mt-2">
                        Use this link to view your anonymous messages privately!
                      </p>
                    </motion.div>

                    {/* View Buttons */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <motion.a
                        href={`/p/${createdPageId}?name=${encodeURIComponent(creatorName)}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                      >
                        <span className="mr-2">👀</span>
                        View Your Page
                      </motion.a>
                      <motion.a
                        href={`/admin/${createdPageId}?name=${encodeURIComponent(creatorName)}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                      >
                        <span className="mr-2">📥</span>
                        View Inbox
                      </motion.a>
                    </motion.div>

                    {/* Social Share Buttons - now with personalized message */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-center gap-4"
                    >
                      <motion.a
                        href={`https://wa.me/?text=${encodeURIComponent(`💕 A Valentine Message For You!\n\nFrom: ${creatorName}\n\n"${creatorMessage}"\n\nSend me an anonymous message! 💌\n${shareUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        title="Share on WhatsApp"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </motion.a>

                      <motion.a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`💕 A Valentine Message For You!\n\nFrom: ${creatorName}\n\n"${creatorMessage}"\n\nSend me an anonymous message! 💌`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        title="Share on Facebook"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </motion.a>

                      <motion.a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`💕 A Valentine Message For You!\n\nFrom: ${creatorName}\n\n"${creatorMessage}"\n\nSend me an anonymous message! 💌\n${shareUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-sky-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        title="Share on Twitter"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </motion.a>
                    </motion.div>

                    <motion.button
                      onClick={() => setCreatedPageId(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-500 hover:text-pink-500 transition-colors text-sm"
                    >
                      🔄 Create Another Page
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Floating Hearts Background - client-side rendered to prevent hydration mismatch */}
        <div className="hearts-bg">
          {useFloatingHearts(20).map((style, i) => (
            <motion.div key={i} className="heart-float text-2xl" style={style}>
              ❤️
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
