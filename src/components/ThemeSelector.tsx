"use client";

import { motion } from "framer-motion";
import { Theme, ThemeConfig, themes } from "@/types";

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSelector({
  selectedTheme,
  onThemeChange,
}: ThemeSelectorProps) {
  const themeList = Object.values(themes);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Choose a Theme ✨
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {themeList.map((theme) => (
          <motion.button
            key={theme.id}
            type="button"
            onClick={() => onThemeChange(theme.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative overflow-hidden rounded-xl p-3 transition-all duration-300
              ${
                selectedTheme === theme.id
                  ? "ring-4 ring-pink-400 ring-offset-2 shadow-xl"
                  : "hover:shadow-lg hover:ring-2 hover:ring-pink-300"
              }
            `}
          >
            <div
              className={`h-16 w-full rounded-lg bg-gradient-to-br ${theme.gradient} mb-2`}
            />
            <p className="text-xs font-medium text-gray-700 truncate">
              {theme.name}
            </p>
            {selectedTheme === theme.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow"
              >
                <span className="text-pink-500 text-xs">✓</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
