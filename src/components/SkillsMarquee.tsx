"use client";

import { useTheme } from "./ThemeProvider";

const skillIcons = [
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Three.js", icon: "🔺" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "PyTorch", icon: "🔥" },
  { name: "Node.js", icon: "💚" },
  { name: "Flask", icon: "🌶️" },
  { name: "FastAPI", icon: "⚡" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Git", icon: "🔀" },
  { name: "OpenAI", icon: "🤖" },
  { name: "Gemini", icon: "✨" },
  { name: "GSAP", icon: "🎬" },
  { name: "Tailwind", icon: "🎨" },
  { name: "GraphQL", icon: "◈" },
  { name: "CI/CD", icon: "🔄" },
];

export default function SkillsMarquee() {
  const items = [...skillIcons, ...skillIcons];
  const { theme } = useTheme();

  return (
    <section className={`py-16 relative z-10 overflow-hidden border-y transition-colors duration-300 ${
      theme === "dark"
        ? "bg-[#0f0f0f] border-white/10"
        : "bg-white border-gray-200"
    }`}>
      <div className="flex animate-marquee w-max">
        {items.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 mx-8 md:mx-12 shrink-0 group"
          >
            <span className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className={`text-lg md:text-xl font-medium transition-colors duration-300 whitespace-nowrap uppercase tracking-wider ${
              theme === "dark"
                ? "text-gray-600 group-hover:text-white"
                : "text-gray-400 group-hover:text-gray-900"
            }`}>
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
