"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useTheme } from "./ThemeProvider";

// ============ SIMPLEX NOISE GLSL ============
const simplexNoise3D = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// ============ BUTTERFLY VERTEX SHADER ============
const butterflyVertexShader = `
${simplexNoise3D}

attribute vec3 aOffset;
attribute float aPhase;
attribute float aSpeed;
attribute float aScale;

uniform float uTime;
uniform vec2 uMouse;

varying float vOpacity;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;

  // === Wing flap animation ===
  float flapAngle = sin(uTime * aSpeed * 4.0 + aPhase) * 0.7;
  // Bend wings based on X distance from center
  float wingFactor = abs(pos.x) / 0.15; // normalized wing span
  float flapY = sin(flapAngle) * wingFactor * 0.08;
  float flapZ = (1.0 - cos(flapAngle)) * wingFactor * 0.05;
  pos.y += flapY;
  pos.z += flapZ;

  // === Scale ===
  pos *= aScale;

  // === Floating path with Simplex Noise ===
  vec3 worldPos = aOffset;
  float t = uTime * 0.08;
  worldPos.x += snoise(vec3(aOffset.x * 0.3 + t, aPhase, 0.0)) * 3.0;
  worldPos.y += snoise(vec3(aOffset.y * 0.3, t * 1.2, aPhase)) * 2.0;
  worldPos.z += snoise(vec3(aOffset.z * 0.3, aPhase, t * 0.8)) * 1.5;

  // === Mouse repulsion ===
  vec2 toMouse = worldPos.xy - uMouse;
  float mouseDist = length(toMouse);
  float repulse = smoothstep(4.0, 0.0, mouseDist) * 3.0;
  worldPos.xy += normalize(toMouse + 0.001) * repulse;

  pos += worldPos;

  vOpacity = 0.15 + 0.25 * (0.5 + 0.5 * sin(uTime * 0.3 + aPhase * 6.28));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// ============ BUTTERFLY FRAGMENT SHADER ============
const butterflyFragmentShader = `
uniform vec3 uColor;
varying float vOpacity;
varying vec2 vUv;

void main() {
  // Soft wing shape — fade at edges
  float dist = length(vUv - 0.5) * 2.0;
  float alpha = smoothstep(1.0, 0.3, dist) * vOpacity;

  gl_FragColor = vec4(uColor, alpha);
}
`;

// ============ BUTTERFLY INSTANCED MESH ============
const BUTTERFLY_COUNT = 60;

function ButterflyParticles({ theme }: { theme?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Generate per-instance attributes
  const { offsets, phases, speeds, scales } = useMemo(() => {
    const offsets = new Float32Array(BUTTERFLY_COUNT * 3);
    const phases = new Float32Array(BUTTERFLY_COUNT);
    const speeds = new Float32Array(BUTTERFLY_COUNT);
    const scales = new Float32Array(BUTTERFLY_COUNT);

    for (let i = 0; i < BUTTERFLY_COUNT; i++) {
      offsets[i * 3] = (Math.random() - 0.5) * 20;
      offsets[i * 3 + 1] = (Math.random() - 0.5) * 14;
      offsets[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 1.5;
      scales[i] = 0.4 + Math.random() * 0.8;
    }
    return { offsets, phases, speeds, scales };
  }, []);

  // Set identity matrices for all instances
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < BUTTERFLY_COUNT; i++) {
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  // Track mouse in world coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value.set(theme === "dark" ? "#a78bfa" : "#4f46e5");
    }
  }, [theme]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    // Convert NDC mouse to world-ish coords
    materialRef.current.uniforms.uMouse.value.set(
      mouseRef.current.x * viewport.width * 0.5,
      mouseRef.current.y * viewport.height * 0.5
    );
  });

  // Create butterfly wing geometry (two quads forming a butterfly)
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.3, 0.12, 4, 2);
    geo.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 3));
    geo.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phases, 1));
    geo.setAttribute("aSpeed", new THREE.InstancedBufferAttribute(speeds, 1));
    geo.setAttribute("aScale", new THREE.InstancedBufferAttribute(scales, 1));
    return geo;
  }, [offsets, phases, speeds, scales]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BUTTERFLY_COUNT]} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={butterflyVertexShader}
        fragmentShader={butterflyFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uColor: { value: new THREE.Color(theme === "dark" ? "#a78bfa" : "#4f46e5") },
        }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

// ============ POST-PROCESSING ============
function PostEffects() {
  return (
    <EffectComposer>
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.03}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0006, 0.0006)}
        radialModulation
        modulationOffset={0.7}
      />
    </EffectComposer>
  );
}

// ============ MAIN SCENE EXPORT ============
export default function ButterflyScene() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ButterflyParticles theme={theme} />
        <PostEffects />
      </Canvas>
    </div>
  );
}
