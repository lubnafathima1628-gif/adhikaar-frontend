'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { usePreferredMotion, useIsMobile } from '@/hooks/use-preferred-motion';

function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);
  const prefersReducedMotion = usePreferredMotion();
  const isMobile = useIsMobile();

  // Create particles based on device capability
  const particleCount = isMobile ? 500 : 2000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [particleCount]);

  useFrame(() => {
    if (!meshRef.current || prefersReducedMotion) return;

    meshRef.current.rotation.x += 0.0001;
    meshRef.current.rotation.y += 0.00015;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.02;
      positions[i + 1] += (Math.random() - 0.5) * 0.02;
      positions[i + 2] += (Math.random() - 0.5) * 0.02;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#5a9fa8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const prefersReducedMotion = usePreferredMotion();

  const linePositions = useMemo(() => {
    const positions = new Float32Array(240); // 40 lines * 2 points * 3 coords
    for (let i = 0; i < positions.length; i += 6) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
      positions[i + 3] = (Math.random() - 0.5) * 100;
      positions[i + 4] = (Math.random() - 0.5) * 100;
      positions[i + 5] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!linesRef.current || prefersReducedMotion) return;
    linesRef.current.rotation.x += 0.00005;
    linesRef.current.rotation.y += 0.00008;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={40}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6b8e7f" transparent opacity={0.3} linewidth={1} />
    </lineSegments>
  );
}

function EnvironmentLights() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[50, 50, 50]} intensity={0.6} color="#e8e3d8" />
      <pointLight position={[-50, -50, 50]} intensity={0.3} color="#5a9fa8" />
      <pointLight position={[50, -50, -50]} intensity={0.2} color="#6b8e7f" />
    </>
  );
}

export function LivingBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        dpr={isMobile ? 1 : window.devicePixelRatio}
        performance={{ min: 0.5 }}
      >
        <EnvironmentLights />
        <ParticleSystem />
        <ConnectionLines />
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} autoRotate />}
        <Preload all />
      </Canvas>
    </div>
  );
}
