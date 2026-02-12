"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ValentinePage, ValentineMessage, themes } from "@/types";
import {
  getValentinePage,
  getMessagesByPage,
  deleteMessage,
} from "@/lib/supabase";
import MessageCard from "@/components/MessageCard";

interface AdminPageProps {
  params: { pageId: string };
}

export default function AdminPage({ params }: AdminPageProps) {
  const [pageId] = useState<string>(params.pageId);
  const [origin, setOrigin] = useState<string>("");
  const [page, setPage] = useState<ValentinePage | null>(null);
  const [messages, setMessages] = useState<ValentineMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Get the real origin once on the client and load page data
  useEffect(() => {
    setOrigin(window.location.origin);
    loadPageData(params.pageId);
  }, [params.pageId]);

  const loadPageData = async (id: string) => {
    setLoading(true);
    try {
      const pageData = await getValentinePage(id);
      setPage(pageData);
      await loadMessages(id);
    } catch (err) {
      console.error("Error loading page:", err);
      setError("Page not found or access denied 😔");
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (id: string) => {
    setMessagesLoading(true);
    try {
      const messagesData = await getMessagesByPage(id);
      setMessages(messagesData || []);
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMessages(pageId);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message. Please try again.");
    }
  };

  // ← FIXED: Now uses the safe origin state (no more localhost fallback)
  const shareUrl = pageId && origin ? `${origin}/p/${pageId}` : "";

  const copyToClipboard = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert("Link copied! 📋");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl"
        >
          💕
        </motion.div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md"
        >
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-500 mb-6">
            {error || "This page doesn't exist or you don't have access."}
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
          >
            Create Your Own Page 💕
          </Link>
        </motion.div>
      </div>
    );
  }

  const theme = themes[page.theme] || themes["romantic-red"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
      {/* Header - unchanged */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                💕 My Valentine - Inbox
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {page.name}!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleRefresh}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={refreshing}
                className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-200 transition-colors"
              >
                <svg
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </motion.button>
              <Link
                href="/"
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                + New Page
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Card - unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          {/* ... stats unchanged ... */}
        </motion.div>

        {/* Your Page Info - now uses the correct shareUrl */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 mb-8 text-white"
        >
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🔗</span>
            Your Valentine Page Link
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/70 font-mono text-sm"
            />
            <motion.button
              onClick={() => copyToClipboard(shareUrl)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            >
              <span className="mr-2">📋</span>
              Copy
            </motion.button>
          </div>
          <p className="text-sm text-purple-100 mt-3">
            Share this link on WhatsApp, Instagram, or anywhere! 📱
          </p>
        </motion.div>

        {/* Messages Section - unchanged (except the share button below) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* ... messages list unchanged ... */}

          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <div className="text-6xl mb-4">💌</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Messages Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Share your page link and wait for the love to come rolling in!
                🌹
              </p>
              <motion.button
                onClick={() => copyToClipboard(shareUrl)}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg inline-flex items-center"
              >
                <span className="mr-2">📤</span>
                Share Your Page
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Tips Section - unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-blue-50 rounded-2xl p-6"
        >
          {/* ... tips unchanged ... */}
        </motion.div>
      </main>

      {/* Footer - unchanged */}
      <footer className="bg-white/50 backdrop-blur-sm py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Made with 💕 for Valentine's Week {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
