"use client";

import { useTheme } from "./ThemeProvider";

const highlights = [
  "CSE Student",
  "AI/ML Builder",
  "Google GenAI Ambassador",
  "Coding Club Founder",
  "Hackathon Contributor",
];

export default function AboutSection() {
  const { theme } = useTheme();

  return (
    <section id="about" className={`py-32 px-6 relative z-10 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0f0f0f]" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
        <div className="w-full md:w-1/3 md:sticky md:top-32">
          <h2 className="text-sm uppercase tracking-widest text-indigo-500 font-semibold mb-4">
            About Me
          </h2>
          <h3 className={`text-4xl md:text-5xl font-serif mb-8 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Where Intelligent Systems Meet Impactful Design.
          </h3>
          <div className="flex flex-wrap gap-2">
            {highlights.map((tag) => (
              <span
                key={tag}
                className={`text-xs uppercase tracking-widest border px-3 py-1.5 rounded-full hover:border-indigo-400 hover:text-indigo-500 transition-colors duration-300 ${
                  theme === "dark"
                    ? "border-white/15 text-gray-400"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-8">
          <p className={`text-xl md:text-2xl font-serif leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            I&apos;m a Computer Science Engineering student and AI-focused builder passionate about creating intelligent, scalable digital products that solve real-world problems. From AI-driven legal document analyzers and invoice verification systems to responsive web platforms and workflow automation tools—I specialize in transforming ideas into impactful applications.
          </p>
          <p className={`text-lg leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            My technical foundation spans Python, JavaScript, Flask, FastAPI, REST APIs, SQL, and modern development workflows including Git, CI/CD, and cloud deployment. Alongside full-stack web development, I actively build with Generative AI, NLP, prompt engineering, and LLM-based systems using tools like Gemini and OpenAI to develop smart, user-centric solutions.
          </p>
          <p className={`text-lg leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            I&apos;m deeply drawn to the intersection of <span className={`font-medium ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>Web Development + AI/ML</span>—where powerful interfaces meet intelligent systems. Whether it&apos;s designing responsive frontend experiences, building backend architectures, or prototyping AI agents, I focus on performance, usability, and innovation.
          </p>
          <p className={`text-lg leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Beyond code, I&apos;m a hackathon contributor, Google GenAI Ambassador, and Coding Club Founder—passionate about leadership, collaboration, and empowering others through technology. My goal is to build future-ready products that combine software engineering excellence with AI innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
