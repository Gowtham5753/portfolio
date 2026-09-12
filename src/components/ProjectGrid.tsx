"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const projectsData = [
  { id: "01", title: "AI Resume Builder", subtitle: "ATS Compliant Resumes", category: "Full-Stack", year: "2024", period: "Jan 2024 - Mar 2024", link: "https://resumeart.netlify.app", image: "/images/ai_resume.png", description: "Developed an intelligent platform that assists users in creating ATS-compliant resumes tailored to specific job descriptions. Integrated AI capabilities to suggest impactful bullet points and optimize keywords.", techStack: ["React", "Node.js", "OpenAI API", "Tailwind"] },
  { id: "02", title: "RightLaw AI", subtitle: "Indian Legal Intelligence", category: "AI", year: "2024", period: "2024", link: "https://github.com/Gowtham5753/rightlaw-ai--1-", image: "/images/rightlaw_ai.png", description: "Engineered an AI-powered legal assistant designed for the Indian legal framework. Enables legal professionals to quickly search through case laws, generate legal drafts, and summarize lengthy court documents.", techStack: ["Next.js", "Python", "LangChain", "Vector DB"] },
  { id: "03", title: "Wealthy", subtitle: "Expense & Income Tracking", category: "Web App", year: "2024", period: "2024", link: "https://wealthy5.netlify.app/", image: "/images/wealthy_app.png", description: "Built a comprehensive personal finance dashboard that allows users to seamlessly track their daily expenses and income streams. Implemented interactive charts and intuitive categorizations.", techStack: ["React", "Firebase", "Chart.js", "Tailwind"] },
  { id: "04", title: "Restaurant Menu", subtitle: "Dynamic Menu Rendering", category: "Full-Stack", year: "2024", period: "2024", link: "https://resttaurantt.netlify.app/", image: "/images/restaurant_menu.png", description: "Created a responsive and interactive restaurant menu application that dynamically fetches and displays food items based on categories. Features a robust backend for easy menu management.", techStack: ["React", "Express", "MongoDB", "CSS"] },
  { id: "05", title: "Portfolio Gen", subtitle: "React & Vite Template", category: "Web App", year: "2024", period: "2024", link: "https://portfgowtham.netlify.app/", image: "/images/portfolio_gen.png", description: "Designed a highly customizable and blazing-fast portfolio template aimed at developers and creative professionals. Built with modern web technologies for maximum performance and easy deployment.", techStack: ["React", "Vite", "Framer Motion", "Tailwind"] },
  { id: "06", title: "FastAPI Search", subtitle: "Multi-tenant API", category: "Backend", year: "2024", period: "2024", link: "https://github.com/Gowtham5753/Multitenant", image: "/images/fastapi_search.png", description: "Developed a highly scalable, multi-tenant search API capable of serving isolated data for different client organizations. Implemented robust authentication and optimized query execution.", techStack: ["Python", "FastAPI", "PostgreSQL", "Docker"] },
  { id: "07", title: "Rate Limiter", subtitle: "Real-time Sync", category: "Backend", year: "2024", period: "2024", link: "https://github.com/Gowtham5753/Ratelimiter", image: "/images/fastapi_rate_limiter.png", description: "Engineered a distributed rate-limiting microservice designed to protect APIs from abuse and ensure fair resource allocation. Utilized Redis for real-time synchronization across instances.", techStack: ["Go", "Redis", "gRPC", "Docker"] },
  { id: "08", title: "Invoice Analyzer", subtitle: "Smart OCR Assistant", category: "AI", year: "2024", period: "2024", link: "https://invoiceanalyzer.netlify.app/", image: "/images/ai_invoice_analyzer.png", description: "Created an intelligent tool that automates the extraction of key data points from various invoice formats using OCR. The AI assistant maps text to structured fields, minimizing manual data entry.", techStack: ["Python", "Tesseract", "OpenAI", "Flask"] },
  { id: "09", title: "Financial AI", subtitle: "Market Trends & Insights", category: "AI", year: "2024", period: "2024", link: "https://financial-ai.netlify.app", image: "/images/financial_ai_guide.png", description: "Developed a predictive analytics platform that analyzes historical financial data to identify emerging market trends. Integrated complex machine learning models to forecast stock movements.", techStack: ["Python", "Pandas", "Scikit-Learn", "React"] },
  { id: "10", title: "EasyDox AI", subtitle: "AI-Powered Legal Document Analyzer", category: "AI", year: "2024", period: "2024", link: "https://easydoxai.netlify.app/", image: "/images/easydox_ai.png", description: "Built a specialized AI application designed to rapidly review and summarize lengthy legal contracts and agreements. Automatically highlights critical clauses and identifies potential risks.", techStack: ["Next.js", "Prisma", "OpenAI", "Tailwind"] },
  { id: "11", title: "RazorReclaim", subtitle: "AI Revenue Recovery Dashboard", category: "Web App", year: "2024", period: "2024", link: "https://moneyrecover.netlify.app/", image: "/images/money_recover.png", description: "An AI-powered revenue recovery dashboard designed to help businesses track, manage, and optimize their payment recovery strategies with intuitive charts and metrics.", techStack: ["React", "Tailwind", "Vite"] }
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
          {filteredProjects.map((project, index) => {
            const isClickable = !!project.link;
            const Wrapper: any = isClickable ? motion.a : motion.div;
            
            return (
            <Wrapper
              href={project.link}
              target={isClickable ? "_blank" : undefined}
              rel={isClickable ? "noopener noreferrer" : undefined}
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
              className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b hover-target transition-colors duration-300 ${
                theme === "dark" ? "border-white/10" : "border-black/10"
              } ${isClickable ? "cursor-pointer" : ""}`}
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
                <p className={`mt-2 text-xl font-medium transition-all duration-500 group-hover:-translate-y-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  {project.subtitle}
                </p>
                <p className={`mt-4 text-base leading-relaxed transition-all duration-500 group-hover:-translate-y-2 opacity-70 group-hover:opacity-100 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2 transition-all duration-500 group-hover:-translate-y-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                      theme === "dark" ? "border-white/20 text-gray-300 bg-white/5" : "border-black/20 text-gray-700 bg-black/5"
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>
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
            </Wrapper>
          )})}
        </AnimatePresence>
      </div>

    </section>
  );
}
