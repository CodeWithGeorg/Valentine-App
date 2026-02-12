"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ValentineMessage } from "@/types";

interface MessageCardProps {
  message: ValentineMessage;
  onDelete: (id: string) => void;
}

export default function MessageCard({ message, onDelete }: MessageCardProps) {
  const formattedDate = formatDistanceToNow(new Date(message.created_at), {
    addSuffix: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-5 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💕</span>
            <span className="text-xs text-gray-400 font-medium">
              {formattedDate}
            </span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {message.content}
          </p>
        </div>
        <motion.button
          onClick={() => onDelete(message.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-300 hover:text-red-400 transition-colors p-2"
          title="Delete message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
