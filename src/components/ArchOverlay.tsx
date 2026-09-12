"use client";

import { useTheme } from "./ThemeProvider";

export default function ArchOverlay() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-between">
      {/* Left Arch */}
      <div 
        className="w-[15vw] h-full relative"
        style={{
          background: theme === "dark" 
            ? "linear-gradient(90deg, #050505 0%, #111111 100%)" 
            : "linear-gradient(90deg, #e5e5e5 0%, #ffffff 100%)",
          borderTopRightRadius: "40vw",
          boxShadow: theme === "dark" 
            ? "10px 0 30px rgba(0,0,0,0.8)" 
            : "10px 0 30px rgba(0,0,0,0.05)",
          transform: "scaleY(1.1) translateY(-5%)",
        }}
      >
        {/* Inner depth shadow */}
        <div 
          className="absolute inset-0"
          style={{
            borderTopRightRadius: "40vw",
            background: theme === "dark"
              ? "linear-gradient(90deg, transparent 80%, rgba(0,0,0,0.5) 100%)"
              : "linear-gradient(90deg, transparent 80%, rgba(0,0,0,0.02) 100%)",
          }}
        />
      </div>

      {/* Right Arch */}
      <div 
        className="w-[15vw] h-full relative"
        style={{
          background: theme === "dark" 
            ? "linear-gradient(-90deg, #050505 0%, #111111 100%)" 
            : "linear-gradient(-90deg, #e5e5e5 0%, #ffffff 100%)",
          borderTopLeftRadius: "40vw",
          boxShadow: theme === "dark" 
            ? "-10px 0 30px rgba(0,0,0,0.8)" 
            : "-10px 0 30px rgba(0,0,0,0.05)",
          transform: "scaleY(1.1) translateY(-5%)",
        }}
      >
        {/* Inner depth shadow */}
        <div 
          className="absolute inset-0"
          style={{
            borderTopLeftRadius: "40vw",
            background: theme === "dark"
              ? "linear-gradient(-90deg, transparent 80%, rgba(0,0,0,0.5) 100%)"
              : "linear-gradient(-90deg, transparent 80%, rgba(0,0,0,0.02) 100%)",
          }}
        />
      </div>
    </div>
  );
}
