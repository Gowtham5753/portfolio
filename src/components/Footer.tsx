"use client";

import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer id="contact" className={`py-20 px-6 relative z-10 transition-colors duration-300 border-t ${
      theme === "dark" ? "bg-[#0a0a0a] border-white/10" : "bg-[#fafafa] border-black/10"
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Left: Contact Info */}
        <div className="flex flex-col gap-6">
          <h2 className={`font-serif text-3xl md:text-5xl tracking-tight hover-target ${
            theme === "dark" ? "text-white" : "text-black"
          }`}>
            Let's create<br/>something amazing.
          </h2>
          <div className="flex flex-col gap-2 mt-4">
            <a href="mailto:skytech9876@gmail.com" className={`text-sm tracking-widest uppercase hover-target underline decoration-transparent hover:decoration-current transition-all ${
              theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}>
              Email Me
            </a>
            <a href="tel:+917396372192" className={`text-sm tracking-widest uppercase hover-target underline decoration-transparent hover:decoration-current transition-all ${
              theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}>
              +91 7396372192
            </a>
          </div>
        </div>

        {/* Middle: Socials */}
        <div className="flex flex-col gap-3">
          <span className={`text-xs uppercase tracking-widest font-semibold ${
            theme === "dark" ? "text-gray-600" : "text-gray-400"
          }`}>Socials</span>
          <a href="https://www.linkedin.com/in/thokala-gowtham-raju-4a2842300/" target="_blank" rel="noopener noreferrer" className={`text-sm tracking-widest uppercase hover-target hover:translate-x-2 transition-transform ${
            theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
          }`}>
            LinkedIn
          </a>
          <a href="https://github.com/Gowtham5753" target="_blank" rel="noopener noreferrer" className={`text-sm tracking-widest uppercase hover-target hover:translate-x-2 transition-transform ${
            theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
          }`}>
            GitHub
          </a>
        </div>

        {/* Right: Location */}
        <div className="flex flex-col gap-3">
          <span className={`text-xs uppercase tracking-widest font-semibold ${
            theme === "dark" ? "text-gray-600" : "text-gray-400"
          }`}>Location</span>
          <p className={`text-sm tracking-widest uppercase ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            India<br/>
            Available for remote work
          </p>
        </div>

      </div>
    </footer>
  );
}
