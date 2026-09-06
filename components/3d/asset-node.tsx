'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AssetNodeProps {
  position: [number, number, number];
  category: string;
  confidence: number;
  isActive?: boolean;
}

export function AssetNode({
  position,
  category,
  confidence,
  isActive = false,
}: AssetNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.Line>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    // Float animation
    meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.01;

    // Scale based on confidence
    const targetScale = 0.5 + confidence * 0.5;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Highlight when active
    if (isActive) {
      (meshRef.current.material as THREE.MeshPhongMaterial).emissive.setHex(0x5a9fa8);
    } else {
      (meshRef.current.material as THREE.MeshPhongMaterial).emissive.setHex(0x000000);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshPhongMaterial
          color="#6b8e7f"
          emissive="#000000"
          wireframe={false}
        />
      </mesh>
      {isActive && (
        <line ref={lineRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, 0, 10, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#5a9fa8" linewidth={2} />
        </line>
      )}
    </group>
  );
}
