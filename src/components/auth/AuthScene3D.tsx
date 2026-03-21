"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Colour palette (mirrors CSS vars)
   ────────────────────────────────────────────── */
const COLORS = {
  primary500: "#4f46e5",
  primary400: "#818cf8",
  primary300: "#a5b4fc",
  primary700: "#3d35af",
  secondary400: "#f472b6",
  secondary500: "#ec4899",
  accent400: "#a3e635",
  accent300: "#bef264",
};

/* ──────────────────────────────────────────────
   Floating Shape — individual animated mesh
   ────────────────────────────────────────────── */
interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "torus" | "icosahedron" | "octahedron" | "dodecahedron" | "sphere";
  color: string;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  scale?: number;
  distort?: boolean;
}

function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
  scale = 1,
  distort = false,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "sphere":
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        {distort ? (
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.85}
          />
        ) : (
          <MeshWobbleMaterial
            color={color}
            roughness={0.15}
            metalness={0.9}
            factor={0.15}
            speed={1.5}
            transparent
            opacity={0.85}
          />
        )}
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   Glowing Orb — soft emissive sphere
   ────────────────────────────────────────────── */
function GlowOrb({
  position,
  color,
  scale = 0.3,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <Float speed={0.8} floatIntensity={2} rotationIntensity={0}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   Camera Rig — mousemove parallax
   ────────────────────────────────────────────── */
function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    // Smooth lerp towards mouse position
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.6,
      0.02
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      pointer.y * 0.4,
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ──────────────────────────────────────────────
   Scene Content — all 3D objects together
   ────────────────────────────────────────────── */
function SceneContent({ variant }: { variant: "signin" | "signup" }) {
  const isSignUp = variant === "signup";

  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.4} />

      {/* Primary light — ultramarine glow */}
      <pointLight
        position={[5, 5, 5]}
        intensity={60}
        color={COLORS.primary400}
      />

      {/* Secondary light — magenta accent */}
      <pointLight
        position={[-5, -3, 3]}
        intensity={40}
        color={COLORS.secondary400}
      />

      {/* Accent light — from behind */}
      <pointLight
        position={[0, 3, -5]}
        intensity={30}
        color={COLORS.accent400}
      />

      {/* Starfield background */}
      <Stars
        radius={50}
        depth={50}
        count={1500}
        factor={3}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Main shapes */}
      <FloatingShape
        position={isSignUp ? [1.5, 1.5, -1] : [-1.5, 1.5, -1]}
        geometry="torus"
        color={COLORS.primary500}
        speed={1.2}
        rotationIntensity={2}
        floatIntensity={1.5}
        scale={0.7}
        distort
      />

      <FloatingShape
        position={isSignUp ? [-1, -1.2, 0.5] : [1, -1.2, 0.5]}
        geometry="icosahedron"
        color={COLORS.secondary500}
        speed={0.8}
        rotationIntensity={1.5}
        floatIntensity={1.2}
        scale={0.6}
      />

      <FloatingShape
        position={isSignUp ? [2, -0.5, -2] : [-2, -0.5, -2]}
        geometry="octahedron"
        color={COLORS.accent300}
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={2}
        scale={0.5}
        distort
      />

      <FloatingShape
        position={isSignUp ? [-1.8, 0.8, 1] : [1.8, 0.8, 1]}
        geometry="dodecahedron"
        color={COLORS.primary300}
        speed={1}
        rotationIntensity={1.8}
        floatIntensity={1}
        scale={0.55}
      />

      <FloatingShape
        position={[0, 2, -3]}
        geometry="sphere"
        color={COLORS.primary700}
        speed={0.5}
        rotationIntensity={0.5}
        floatIntensity={0.8}
        scale={1.2}
        distort
      />

      {/* Soft glow orbs for depth */}
      <GlowOrb
        position={isSignUp ? [3, 2, -4] : [-3, 2, -4]}
        color={COLORS.primary400}
        scale={1.5}
      />
      <GlowOrb
        position={isSignUp ? [-2, -2, -3] : [2, -2, -3]}
        color={COLORS.secondary400}
        scale={1.2}
      />
      <GlowOrb position={[0, -3, -2]} color={COLORS.accent400} scale={0.8} />

      {/* Camera rig for parallax */}
      <CameraRig />
    </>
  );
}

/* ──────────────────────────────────────────────
   AuthScene3D — exported wrapper component
   ────────────────────────────────────────────── */
export interface AuthScene3DProps {
  variant?: "signin" | "signup";
}

export default function AuthScene3D({
  variant = "signin",
}: AuthScene3DProps) {
  return (
    <div className="auth-3d-canvas">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 6],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <SceneContent variant={variant} />
      </Canvas>
    </div>
  );
}
