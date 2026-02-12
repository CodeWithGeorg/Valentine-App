"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createAnonymousMessage } from "@/lib/supabase";
import { validateMessage, filterProfanity } from "@/lib/profanity";

interface MessageFormProps {
  pageName: string;
  onSuccess: () => void;
}

export default function MessageForm({ pageName, onSuccess }: MessageFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate message
    const validation = validateMessage(message);
    if (!validation.valid) {
      setError(validation.error || "Invalid message");
      return;
    }

    setLoading(true);

    try {
      // Filter profanity
      const filteredMessage = filterProfanity(message);

      await createAnonymousMessage(pageName, filteredMessage);
      setSuccess(true);
      setMessage("");
      onSuccess();
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-6xl mb-4"
        >
          💕
        </motion.div>
        <h3 className="text-2xl font-bold text-pink-600 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Your anonymous message has been delivered!
          <br />
          Will they guess who you are? 💭
        </p>
        <motion.button
          onClick={() => setSuccess(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
        >
          Send Another Message 💌
        </motion.button>
      </motion.div>
    );
  }

  const characterCount = message.length;
  const isOverLimit = characterCount > 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">💌</span>
        Send an Anonymous Message
      </h3>

      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your sweet message here... (max 150 characters)"
          maxLength={150}
          rows={3}
          className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-4 transition-all outline-none resize-none mb-4
            ${
              isOverLimit
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-pink-400 focus:ring-pink-100"
            }
          `}
          disabled={loading}
        />

        <div className="flex justify-between items-center mb-4">
          <span
            className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-400"}`}
          >
            {characterCount}/150 characters
          </span>
          <span className="text-sm text-gray-400">😏 Stay anonymous!</span>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={loading || isOverLimit || message.trim().length < 2}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`
            w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center
            ${
              loading || isOverLimit || message.trim().length < 2
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            }
          `}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
              Sending...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              Send Anonymously
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
