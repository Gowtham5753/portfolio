"use client";

import { useTheme } from "./ThemeProvider";

const skills = [
  { 
    category: "Product & Strategy", 
    items: ["Product Roadmapping & Lifecycle Management", "Technical Scoping & Architecture Design", "Agile & Cross-functional Leadership", "Data-Driven UX Strategy", "Go-to-Market (GTM) Technical Strategy"],
    emoji: "🎯",
    colSpan: "md:col-span-2"
  },
  { 
    category: "AI & Machine Learning", 
    items: ["PyTorch & TensorFlow", "Large Language Models (LLM) Integration & Fine-Tuning", "Computer Vision & Real-time Inference", "Predictive Modeling & Data Pipelines", "Model Deployment (MLOps)"],
    emoji: "🧠",
    colSpan: "md:col-span-2"
  },
  { 
    category: "Frontend & Immersive Web", 
    items: ["React & Next.js", "Three.js & WebGL (React Three Fiber)", "GSAP & Advanced CSS Animation", "Responsive UI/UX Implementation", "Web Performance Optimization"],
    emoji: "✨",
    colSpan: "md:col-span-2"
  },
  { 
    category: "Backend & Systems Infrastructure", 
    items: ["Node.js & Python (FastAPI/Django)", "RESTful & GraphQL API Design", "PostgreSQL & NoSQL Databases", "Cloud Architecture (AWS/GCP)", "Docker & Containerization"],
    emoji: "⚙️",
    colSpan: "md:col-span-2"
  },
];

export default function SkillsSection() {
  const { theme } = useTheme();

  return (
    <section id="skills" className={`py-32 px-6 relative z-10 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0a0a0a]" : "bg-[#fafafa]"
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-1/3 md:sticky md:top-32">
          <h2 className="text-sm uppercase tracking-widest text-indigo-500 font-semibold mb-4">
            Core Competencies
          </h2>
          <h3 className={`text-4xl md:text-5xl font-serif mb-6 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            The Technical & Strategic Arsenal.
          </h3>
          <p className={`text-lg leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Mastery over a diverse stack is essential for end-to-end AI deployment. 
            I leverage industry-standard frameworks for model training and combine them with cutting-edge web technologies to deliver seamless, performant, and visually striking applications.
          </p>
        </div>
        
        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <div key={index} className={`rounded-2xl p-8 transition-all duration-300 group border ${skillGroup.colSpan} ${
              theme === "dark"
                ? "bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-white/10"
                : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-lg"
            }`}>
              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${
                theme === "dark" ? "border-white/10" : "border-gray-100"
              }`}>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{skillGroup.emoji}</span>
                <h4 className={`font-serif text-2xl transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {skillGroup.category}
                </h4>
              </div>
              <ul className="space-y-3">
                {skillGroup.items.map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 transition-colors ${
                    theme === "dark"
                      ? "text-gray-400 group-hover:text-gray-300"
                      : "text-gray-500 group-hover:text-gray-600"
                  }`}>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
