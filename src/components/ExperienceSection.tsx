"use client";

import { useTheme } from "./ThemeProvider";

const experiences = [
  {
    role: "Artificial Intelligence & Cloud Technology Intern",
    company: "IBM Inc",
    period: "Sep 2025 - Oct 2025",
    link: "https://resumeart.netlify.app",
    description: "Built ResumeAI, an LLM-powered resume generation system using FastAPI, Gemini API, and Python. Designed structured prompting workflows using few-shot and chain-of-thought reasoning for reliable AI outputs, improving ATS-friendly template generation by 65%. Deployed on GCP using Docker.",
    tags: ["FastAPI", "Gemini API", "Python", "GCP"],
  },
  {
    role: "Frontend Web Developer Intern",
    company: "IBM Inc",
    period: "Aug 2025 - Oct 2025",
    link: "https://portfgowtham.netlify.app/",
    description: "Built a dynamic portfolio builder using React.js, Tailwind CSS, and HTML/CSS, improving page load time by 35%. Integrated client-side state management and data export features. Deployed on Netlify via CI/CD pipeline (GitHub Actions), achieving 99% uptime.",
    tags: ["React.js", "Tailwind CSS", "CI/CD", "Netlify"],
  }
];

const achievements = [
  {
    role: "Google Gen AI Hackathon",
    company: "EasyDox AI",
    period: "Hackathon",
    link: "https://easydoxai.netlify.app",
    description: "Participated as a 6-member team to build EasyDox AI, an AI-powered legal document analyzer using Gemini 2.5 Flash that summarizes legal documents in multiple languages and supports multilingual voice-to-text input.",
    tags: ["Gemini 2.5 Flash", "Multilingual", "AI"],
  },
  {
    role: "HackWithHyderabad",
    company: "AI Invoice Analyzer",
    period: "Hackathon",
    description: "Contributed to building an automated invoice verification system using Flask and Gemini API, significantly reducing manual review time and enhancing accuracy.",
    tags: ["Flask", "Gemini API"],
  },
  {
    role: "Google Gemini AI Student Ambassador",
    company: "Campus Leader",
    period: "Leadership",
    description: "Promoted generative AI adoption on campus by conducting technical workshops and mentorship sessions. Guided students in building AI-powered projects and strengthened community engagement.",
    tags: ["Leadership", "Mentorship", "GenAI"],
  },
  {
    role: "Founder & Leader",
    company: "Coding Club",
    period: "Leadership",
    description: "Founded and led a university coding club, organizing coding contests, peer-learning sessions, and technical events. Engaged 50+ students in hackathons and collaborative projects.",
    tags: ["Community", "Event Management"],
  }
];

export default function ExperienceSection() {
  const { theme } = useTheme();

  return (
    <section id="experience" className={`py-32 px-6 relative z-10 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0f0f0f]" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-1/3 md:sticky md:top-32">
          <h2 className="text-sm uppercase tracking-widest text-indigo-500 font-semibold mb-4">
            Experience & Achievements
          </h2>
          <h3 className={`text-4xl md:text-5xl font-serif mb-6 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Building, Leading, and Innovating.
          </h3>
          <p className={`text-lg leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            From developing impactful AI solutions during internships and hackathons to founding coding communities on campus, my journey is defined by a passion for creating and leading. Here is a snapshot of my professional experience and key achievements.
          </p>
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <h4 className={`text-xl uppercase tracking-widest font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Work Experience</h4>
          {experiences.map((exp, index) => (
            <div key={index} className={`group flex flex-col md:flex-row gap-4 md:gap-8 border p-6 -mx-6 rounded-2xl transition-all duration-300 ${
              theme === "dark"
                ? "border-transparent hover:bg-white/5 hover:border-white/10"
                : "border-transparent hover:bg-gray-50 hover:border-gray-200"
            }`}>
              <div className={`w-full md:w-1/4 text-sm font-medium tracking-widest mt-1 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}>
                {exp.period}
              </div>
              <div className="w-full md:w-3/4">
                <h4 className={`text-2xl font-serif mb-1 group-hover:text-indigo-500 transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {exp.link ? (
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.role}
                    </a>
                  ) : (
                    exp.role
                  )}
                </h4>
                <div className={`text-lg mb-3 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>{exp.company}</div>
                <p className={`leading-relaxed mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-white/5 text-gray-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300"
                        : "bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-500"
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <h4 className={`text-xl uppercase tracking-widest font-semibold mt-10 mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Achievements</h4>
          {achievements.map((exp, index) => (
            <div key={index} className={`group flex flex-col md:flex-row gap-4 md:gap-8 border p-6 -mx-6 rounded-2xl transition-all duration-300 ${
              theme === "dark"
                ? "border-transparent hover:bg-white/5 hover:border-white/10"
                : "border-transparent hover:bg-gray-50 hover:border-gray-200"
            }`}>
              <div className={`w-full md:w-1/4 text-sm font-medium tracking-widest mt-1 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}>
                {exp.period}
              </div>
              <div className="w-full md:w-3/4">
                <h4 className={`text-2xl font-serif mb-1 group-hover:text-indigo-500 transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {exp.link ? (
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.role}
                    </a>
                  ) : (
                    exp.role
                  )}
                </h4>
                <div className={`text-lg mb-3 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>{exp.company}</div>
                <p className={`leading-relaxed mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-white/5 text-gray-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300"
                        : "bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-500"
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
