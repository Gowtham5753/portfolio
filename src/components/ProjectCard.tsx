"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { gsap } from "gsap";

// ============ SIMPLEX NOISE 2D for Fragment Shader ============
const noise2D = `
vec3 permute2(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise2(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute2(permute2(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x2 = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x2) - 0.5;
  vec3 ox = floor(x2 + 0.5);
  vec3 a0 = x2 - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

// ============ ENHANCED 3D DISTORTION MATERIAL ============
const LiquidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uIntensity: 0.5,
  },
  // Vertex Shader — 3D Bend & Wave
  `
    uniform float uTime;
    uniform float uProgress;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;

      // === 3D Bend Effect ===
      // Curve edges away from the camera based on distance from center
      float distFromCenter = length(pos.xy);
      float bend = distFromCenter * distFromCenter * 0.5 * uProgress;
      pos.z -= bend;

      // === 3D Wave Effect ===
      // Add a flowing wave across the X axis
      float wave = sin(pos.x * 8.0 + uTime * 3.0) * 0.08 * uProgress;
      pos.z += wave;

      // Rotate slightly on Y axis for depth
      float rotY = sin(uProgress * 3.14159) * 0.2;
      mat2 rotMatrix = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
      pos.xz = rotMatrix * pos.xz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader — Liquid Distortion + RGB Shift
  `
    ${noise2D}

    uniform float uTime;
    uniform float uProgress;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uIntensity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // === Displacement map from noise ===
      float displacement = snoise2(uv * 3.0 + uTime * 0.3) * uProgress * uIntensity;

      // === Liquid wave distortion ===
      float dist = distance(uv, uMouse);
      float wave = sin(dist * 15.0 - uTime * 4.0) * 0.03 * uProgress;
      float ripple = smoothstep(0.5, 0.0, dist) * wave;

      // === Combine distortions ===
      vec2 distortedUv = uv + vec2(displacement * 0.08) + ripple;

      // === RGB Shift on hover ===
      float rgbShift = uProgress * 0.015;
      float r = texture2D(uTexture, distortedUv + vec2(rgbShift, 0.0)).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - vec2(rgbShift, 0.0)).b;

      // === Base color with alpha ===
      float baseAlpha = texture2D(uTexture, distortedUv).a;

      // === Vignette ===
      float vignette = 1.0 - smoothstep(0.3, 1.5, length(uv - 0.5) * 2.0) * uProgress * 0.4;

      gl_FragColor = vec4(r * vignette, g * vignette, b * vignette, baseAlpha);
    }
  `
);

extend({ LiquidDistortionMaterial });

// ============ SCENE COMPONENT ============
type SceneProps = {
  imageUrl: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
  progressRef: React.MutableRefObject<{ value: number }>;
};

function Scene({ imageUrl, isHovered, mousePos, progressRef }: SceneProps) {
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageUrl);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uTime += delta;
    materialRef.current.uProgress = progressRef.current.value;
    materialRef.current.uMouse.lerp(
      new THREE.Vector2(mousePos.x, mousePos.y), 0.08
    );
  });

  return (
    <mesh>
      {/* 32x32 segments needed for vertex displacement */}
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <liquidDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        uIntensity={0.6}
      />
    </mesh>
  );
}

// ============ PROJECT CARD COMPONENT ============
type ProjectCardProps = {
  title: string;
  category: string;
  imageUrl: string;
  index: number;
};

export default function ProjectCard({ title, category, imageUrl, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const progressRef = useRef({ value: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(progressRef.current, {
      value: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
    gsap.to(progressRef.current, {
      value: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <div
      className="group relative w-full aspect-[4/5] cursor-none overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
          <Scene
            imageUrl={imageUrl}
            isHovered={isHovered}
            mousePos={mousePos}
            progressRef={progressRef}
          />
        </Canvas>
      </div>

      {/* Overlay with cinematic reveal */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl">
        <div className="overflow-hidden">
          <h3 className="text-3xl font-serif text-white mb-2 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {title}
          </h3>
        </div>
        <div className="overflow-hidden">
          <p className="text-sm uppercase tracking-widest text-gray-300 translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {category}
          </p>
        </div>
      </div>

      {/* Index number */}
      <div className="absolute top-6 right-6 z-10 text-white/20 font-serif text-6xl font-bold pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}
