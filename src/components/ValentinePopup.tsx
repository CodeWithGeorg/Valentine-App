"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ValentinePopup() {
  const [isValentineOver, setIsValentineOver] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
 
    setIsClient(true);

   r
    const now = new Date();
    const currentYear = now.getFullYear();

    const valentineDate = new Date(currentYear, 1, 14); 
    if (now > valentineDate) {
      setIsValentineOver(true);
    } else {
     
      const lastYearValentine = new Date(currentYear - 1, 1, 14);
      if (now < valentineDate && now.getMonth() < 1) {
    
        setIsValentineOver(false);
      }
    }
  }, []);

  
  if (!isClient) {
    return null;
  }

  return (
    <AnimatePresence>
      {isValentineOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-pink-100 via-red-50 to-pink-200"
        >
          {/* Floating hearts background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{
                  opacity: 0,
                  y: "110%",
                  x: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: 0.6,
                  y: "-10%",
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "linear",
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>

          {/* Main popup content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg mx-4 text-center relative z-10"
          >
            {/* Heart decoration */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl mb-6"
            >
              💔
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 bg-clip-text text-transparent mb-4">
              Wait for the Next Valentine's Day!
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              Valentine's Day has passed for this year.
              <br />
              But don't worry, love is in the air every day! 💕
            </p>

            <div className="text-sm text-gray-400">
              <p>Come back next year to create your Valentine page!</p>
              <p className="mt-2">Until then, keep the love alive! ❤️</p>
            </div>

            {/* Decorative hearts */}
            <div className="flex justify-center gap-2 mt-6 text-3xl">
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                💕
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              >
                💗
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              >
                💖
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
