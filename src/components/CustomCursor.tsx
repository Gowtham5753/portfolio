"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<"default" | "link" | "project">("default");
  const [cursorText, setCursorText] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    // We use a RAF for the mouse move to keep it performant
    let rafId: number;
    const updateMousePosition = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const projectRow = target.closest("[data-cursor-text]");
      if (projectRow) {
        setHoverState("project");
        setCursorText(projectRow.getAttribute("data-cursor-text") || "View");
        return;
      }

      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-target")
      ) {
        setHoverState("link");
        setCursorText("");
      } else {
        setHoverState("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const isDark = theme === "dark";

  // Different variants based on the state
  const variants = {
    default: {
      width: 16,
      height: 16,
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)",
      border: isDark ? "1px solid rgba(255, 255, 255, 0.8)" : "1px solid rgba(0, 0, 0, 0.8)",
      mixBlendMode: "normal" as any,
    },
    link: {
      width: 32,
      height: 32,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: isDark ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
      border: "1px solid transparent",
      mixBlendMode: "difference" as any,
    },
    project: {
      width: 80,
      height: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: isDark ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
      border: "1px solid transparent",
      mixBlendMode: "normal" as any, // So text is legible
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      variants={variants}
      animate={hoverState}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
    >
      <AnimatePresence>
        {hoverState === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={`text-xs uppercase tracking-widest font-semibold ${isDark ? "text-black" : "text-white"}`}
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
