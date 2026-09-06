'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import { AssetNode } from './asset-node';
import { DataStream } from './data-stream';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface AssetGraphProps {
  assets: Array<{
    id: string;
    category: string;
    confidence: number;
  }>;
  isActive?: string | null;
}

export function AssetGraph({ assets, isActive }: AssetGraphProps) {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0, 40], fov: 50 }}
      dpr={isMobile ? 1 : window.devicePixelRatio}
    >
      {/* Center node - user identity */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial color="#b8956a" emissive="#d4b896" />
      </mesh>

      {/* Asset nodes */}
      {assets.map((asset, index) => {
        const angle = (index / assets.length) * Math.PI * 2;
        const distance = 15;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const z = (Math.random() - 0.5) * 10;

        return (
          <group key={asset.id}>
            <AssetNode
              position={[x, y, z]}
              category={asset.category}
              confidence={asset.confidence}
              isActive={asset.id === isActive}
            />
            <DataStream start={[0, 0, 0]} end={[x, y, z]} />
          </group>
        );
      })}

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <Preload all />
    </Canvas>
  );
}
