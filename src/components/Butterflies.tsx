"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Butterfly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  dirX: number;
  dirY: number;
  rotation: number;
  opacity: number;
  flapSpeed: number;
}

let globalId = 0;

export default function Butterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const lastCursorSpawn = useRef(0);
  const lastScrollSpawn = useRef(0);
  const lastScrollY = useRef(0);

  const spawnButterfly = useCallback((x: number, y: number) => {
    const b: Butterfly = {
      id: globalId++,
      x,
      y,
      // Variable size — ranges from tiny (8px) to large (28px)
      size: 8 + Math.random() * 20,
      duration: 2 + Math.random() * 3,
      dirX: (Math.random() - 0.5) * 180,
      dirY: -(30 + Math.random() * 130),
      rotation: (Math.random() - 0.5) * 80,
      opacity: 0.3 + Math.random() * 0.5,
      flapSpeed: 150 + Math.random() * 200,
    };
    setButterflies((prev) => [...prev.slice(-25), b]);
  }, []);

  // === CURSOR MOVEMENT — spawn butterflies at mouse position ===
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCursorSpawn.current < 100) return;
      lastCursorSpawn.current = now;
      spawnButterfly(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spawnButterfly]);

  // === SCROLL — spawn butterflies at random x positions ===
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      if (delta < 10) return;
      if (now - lastScrollSpawn.current < 150) return;
      lastScrollSpawn.current = now;

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      spawnButterfly(x, y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [spawnButterfly]);

  // === Cleanup old butterflies ===
  useEffect(() => {
    if (butterflies.length === 0) return;
    const timer = setInterval(() => {
      setButterflies((prev) => prev.filter((b) => Date.now() - b.id < 6000));
    }, 800);
    return () => clearInterval(timer);
  }, [butterflies.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {butterflies.map((b) => (
        <SingleButterfly key={b.id} butterfly={b} />
      ))}
    </div>
  );
}

function SingleButterfly({ butterfly: b }: { butterfly: Butterfly }) {
  return (
    <div
      className="absolute"
      style={{
        left: b.x,
        top: b.y,
        animation: `bfly-drift ${b.duration}s ease-out forwards`,
        ["--dx" as string]: `${b.dirX}px`,
        ["--dy" as string]: `${b.dirY}px`,
        ["--rot" as string]: `${b.rotation}deg`,
      }}
    >
      <svg
        width={b.size}
        height={b.size}
        viewBox="0 0 32 32"
        fill="none"
        style={{
          transform: "translate(-50%, -50%)",
          animation: `bfly-flap ${b.flapSpeed}ms ease-in-out infinite`,
        }}
      >
        {/* Left wing */}
        <path
          d="M16 16C14 11 9 5 5 7C1 9 3 14 7 16C11 18 15 16 16 16Z"
          fill="white"
          fillOpacity={b.opacity}
        />
        {/* Left wing inner */}
        <path
          d="M16 16C14.5 13 12 9 9 10C6 11 8 14 10 15.5C12 17 15 16 16 16Z"
          fill="white"
          fillOpacity={b.opacity * 0.5}
        />
        {/* Right wing */}
        <path
          d="M16 16C18 11 23 5 27 7C31 9 29 14 25 16C21 18 17 16 16 16Z"
          fill="white"
          fillOpacity={b.opacity}
        />
        {/* Right wing inner */}
        <path
          d="M16 16C17.5 13 20 9 23 10C26 11 24 14 22 15.5C20 17 17 16 16 16Z"
          fill="white"
          fillOpacity={b.opacity * 0.5}
        />
        {/* Body */}
        <ellipse cx="16" cy="18" rx="0.7" ry="3.5" fill="white" fillOpacity={b.opacity * 0.8} />
        {/* Antennae */}
        <path d="M15 15C14 12 12 10 11 9" stroke="white" strokeOpacity={b.opacity * 0.6} strokeWidth="0.4" fill="none" />
        <path d="M17 15C18 12 20 10 21 9" stroke="white" strokeOpacity={b.opacity * 0.6} strokeWidth="0.4" fill="none" />
      </svg>
    </div>
  );
}
