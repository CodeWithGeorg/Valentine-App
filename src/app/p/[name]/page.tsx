"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ValentinePage, themes } from "@/types";
import { getValentinePageByName } from "@/lib/supabase";
import MessageForm from "@/components/MessageForm";

/* =======================
   Custom Hook (VALID)
======================= */
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

interface PublicPageProps {
  params: { name: string };
}

export default function PublicPage({ params }: PublicPageProps) {
  const [page, setPage] = useState<ValentinePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState(false);

  /* ✅ HOOK CALLED ONCE — CORRECT */
  const hearts = useFloatingHearts(15);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const pageData = await getValentinePageByName(params.name);
        setPage(pageData);
      } catch (err) {
        console.error(err);
        setError("Page not found 😔");
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [params.name]);

  const handleMessageSent = () => {
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
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
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <p className="text-xl text-gray-700">{error}</p>
      </div>
    );
  }

  const theme = themes[page.theme] || themes["romantic-red"];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className={`fixed inset-0 bg-gradient-to-br ${theme.gradient} opacity-90`}
      />

      {/* Floating Hearts */}
      <div className="hearts-bg">
        {hearts.map((style, i) => (
          <motion.div
            key={i}
            className="heart-float text-2xl absolute"
            style={style}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-4">
          <Link href="/" className="text-white font-medium">
            🏠 Create Your Own
          </Link>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
            <div
              className={`bg-gradient-to-r ${theme.gradient} p-6 text-center text-white`}
            >
              <h1 className="text-3xl font-bold">
                💕 A Valentine Message For You 💕
              </h1>
            </div>

            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">{page.name}</h2>
              <p className="italic text-lg mb-6">"{page.message}"</p>

              {!messageSent ? (
                <MessageForm
                  pageName={page.name}
                  onSuccess={handleMessageSent}
                />
              ) : (
                <p className="text-green-600 font-bold">
                  🎉 Message Sent Successfully!
                </p>
              )}
            </div>
          </div>
        </main>

        <footer className="p-4 text-center text-white/70">
          Valentine’s Week {new Date().getFullYear()} ❤️
        </footer>
      </div>
    </div>
  );
}
