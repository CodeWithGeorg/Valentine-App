"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Theme, themes } from "@/types";
import ThemeSelector from "./ThemeSelector";
import { validatePageData } from "@/lib/profanity";
import { createValentinePage } from "@/lib/supabase";

interface PageFormProps {
  onSuccess: (pageId: string, name: string, message: string) => void;
}

export default function PageForm({ onSuccess }: PageFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<Theme>("romantic-red");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate input
    const validation = validatePageData(name, message);
    if (!validation.valid) {
      setError(validation.error || "Invalid input");
      return;
    }

    setLoading(true);

    try {
      const page = await createValentinePage(name, message, theme);
      onSuccess(page.id, name, message);
    } catch (err) {
      console.error("Error creating page:", err);
      setError("Failed to create page. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const characterCount = message.length;
  const isOverLimit = characterCount > 300;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block mb-4"
          >
            <div className="heart w-12 h-12" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            Create Your Valentine Page
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details below to create your personalized page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Name or Nickname 💕
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Alex, My Love, Sweetheart..."
              maxLength={50}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all outline-none text-lg"
              disabled={loading}
            />
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Valentine Message 💌
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something sweet... (max 300 characters)"
              maxLength={300}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-4 transition-all outline-none text-lg resize-none
                ${
                  isOverLimit
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-pink-400 focus:ring-pink-100"
                }
              `}
              disabled={loading}
            />
            <div className="flex justify-between mt-2">
              <span
                className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-400"}`}
              >
                {characterCount}/300 characters
              </span>
            </div>
          </div>

          {/* Theme Selector */}
          <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={
              loading ||
              isOverLimit ||
              name.trim().length === 0 ||
              message.trim().length === 0
            }
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`
              w-full py-4 rounded-xl text-lg font-bold text-white shadow-lg transition-all
              ${
                loading ||
                isOverLimit ||
                name.trim().length === 0 ||
                message.trim().length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-pink-200"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating your page...
              </span>
            ) : (
              "✨ Create My Valentine Page"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
