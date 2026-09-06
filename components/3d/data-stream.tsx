'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataStreamProps {
  start: [number, number, number];
  end: [number, number, number];
  speed?: number;
}

export function DataStream({ start, end, speed = 0.1 }: DataStreamProps) {
  const tubeRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame(() => {
    time.current += speed;
  });

  const direction = new THREE.Vector3(...end).sub(new THREE.Vector3(...start));
  const length = direction.length();
  const midpoint = new THREE.Vector3(...start).add(
    direction.clone().multiplyScalar(0.5)
  );

  return (
    <group position={midpoint}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              -length / 2,
              0,
              0,
              length / 2,
              0,
              0,
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#5a9fa8"
          linewidth={2}
          transparent
          opacity={0.6}
        />
      </line>
    </group>
  );
}
