"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section
      className={`relative pt-48 pb-20 flex flex-col justify-center items-center overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-[#fafafa]"
      }`}
    >
      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold mb-6 ${
            theme === "dark" ? "bg-white/10 text-white" : "bg-black/5 text-black"
          }`}
        >
          Projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`font-sans text-[12vw] md:text-[8vw] leading-[0.9] tracking-tight text-center z-10 hover-target transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Selected Projects
        </motion.h1>
      </div>
    </section>
  );
}
