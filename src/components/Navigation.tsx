"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const links = [
  { name: "Index", href: "/" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects", active: true },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? theme === "dark"
            ? "py-3 bg-black/70 backdrop-blur-xl shadow-sm border-b border-white/10"
            : "py-3 bg-white/70 backdrop-blur-xl shadow-sm border-b border-gray-200/50"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className={`font-serif text-2xl tracking-tighter uppercase font-bold hover-target ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Gowtham<span className="gradient-text"> Raju</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <nav className="flex gap-1">
            {links.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm uppercase tracking-widest font-medium px-4 py-2 transition-colors hover-target ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredIndex === i && (
                  <motion.div
                    layoutId="nav-hover"
                    className={`absolute inset-0 rounded-full -z-0 ${
                      theme === "dark" ? "bg-white/10" : "bg-gray-100"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover-target ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 text-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
