"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const projectsData = [
  { id: "01", title: "AI Resume Builder", subtitle: "ATS Compliant Resumes", category: "Full-Stack", year: "2024", image: "/images/ai_resume.png" },
  { id: "02", title: "RightLaw AI", subtitle: "Indian Legal Intelligence", category: "AI", year: "2024", image: "/images/rightlaw_ai.png" },
  { id: "03", title: "Wealthy", subtitle: "Expense & Income Tracking", category: "Web App", year: "2024", image: "/images/wealthy_app.png" },
  { id: "04", title: "Restaurant Menu", subtitle: "Dynamic Menu Rendering", category: "Full-Stack", year: "2024", image: "/images/restaurant_menu.png" },
  { id: "05", title: "Portfolio Gen", subtitle: "React & Vite Template", category: "Web App", year: "2024", image: "/images/portfolio_gen.png" },
  { id: "06", title: "FastAPI Search", subtitle: "Multi-tenant API", category: "Backend", year: "2024", image: "/images/fastapi_search.png" },
  { id: "07", title: "Rate Limiter", subtitle: "Real-time Sync", category: "Backend", year: "2024", image: "/images/fastapi_rate_limiter.png" },
  { id: "08", title: "Invoice Analyzer", subtitle: "Smart OCR Assistant", category: "AI", year: "2024", image: "/images/ai_invoice_analyzer.png" },
  { id: "09", title: "Financial AI", subtitle: "Market Trends & Insights", category: "AI", year: "2024", image: "/images/financial_ai_guide.png" }
];

const filters = ["All", "Full-Stack", "AI", "Web App", "Backend"];

export default function ProjectGrid() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projectsData.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section id="projects" className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32 min-h-screen">
      
      {/* FILTER BAR */}
      <div className={`sticky top-20 z-30 flex flex-wrap gap-2 md:gap-4 py-6 mb-12 backdrop-blur-md transition-colors ${
        theme === "dark" ? "bg-[#0a0a0a]/80" : "bg-[#fafafa]/80"
      }`}>
        {filters.map((filter) => {
          const count = filter === "All" ? projectsData.length : projectsData.filter((p) => p.category === filter).length;
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-5 py-2 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover-target ${
                isActive
                  ? theme === "dark" ? "text-black" : "text-white"
                  : theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className={`absolute inset-0 rounded-full -z-10 ${
                    theme === "dark" ? "bg-white" : "bg-black"
                  }`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter} <sup className="text-[10px] ml-1">{count}</sup></span>
            </button>
          );
        })}
      </div>

      {/* PROJECTS LIST */}
      <div className="flex flex-col w-full">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              data-cursor-text="View"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b hover-target cursor-none transition-colors duration-300 ${
                theme === "dark" ? "border-white/10" : "border-black/10"
              }`}
            >
              {/* Left: Meta */}
              <div className="w-full md:w-1/4 flex md:flex-col gap-4 md:gap-2 mb-4 md:mb-0">
                <span className={`text-sm tracking-widest font-mono ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  {project.id}
                </span>
                <span className={`text-sm uppercase tracking-widest ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {project.category} — {project.year}
                </span>
              </div>

              {/* Middle: Title */}
              <div className="w-full md:w-1/2 mb-6 md:mb-0 z-10">
                <h3 className={`font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight transition-all duration-500 group-hover:-translate-y-2 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}>
                  {project.title}
                </h3>
                <p className={`mt-4 text-lg transition-all duration-500 group-hover:-translate-y-2 opacity-70 group-hover:opacity-100 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  {project.subtitle}
                </p>
              </div>

              {/* Right: Thumbnail */}
              <div className="w-full md:w-1/4 flex justify-end">
                <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:rotate-1">
                  <div className={`absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr ${
                    theme === "dark" ? "from-black/40 to-transparent" : "from-black/10 to-transparent"
                  }`} />
                  {/* For now, just use an img to keep it highly performant inside lists */}
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
