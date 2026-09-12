"use client";

import { useTheme } from "./ThemeProvider";

export default function ContactSection() {
  const { theme } = useTheme();

  return (
    <section id="contact" className="py-32 px-6 bg-gray-900 relative z-10">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-sm uppercase tracking-widest text-indigo-400 font-semibold mb-4">
          Get In Touch
        </h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white mb-6">
          Ready to build the future?
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed mb-12">
          Whether you are looking to integrate advanced machine learning into your product, need a custom WebGL experience, or simply want to discuss the latest in decentralized AI, I am always open to new opportunities.
        </p>
        <a
          href="mailto:skytech9876@gmail.com"
          className="inline-block text-lg uppercase tracking-widest border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 hover-target"
        >
          Initiate Contact
        </a>
        <p className="mt-6 text-gray-500 text-sm tracking-wider">
          or reach out directly at{" "}
          <a
            href="mailto:skytech9876@gmail.com"
            className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 underline underline-offset-2"
          >
            skytech9876@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
