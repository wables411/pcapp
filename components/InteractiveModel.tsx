'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.2}
          emissive="#000000"
        />
      </mesh>
    </>
  );
}

// To load a GLB model, uncomment and use this component instead:
// function GLBModel() {
//   const groupRef = useRef<THREE.Group>(null);
//   const gltf = useGLTF('/models/oil-portions.glb');
//   
//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += 0.005;
//     }
//   });
//   
//   return <primitive ref={groupRef} object={gltf.scene} position={[0, 0, 0]} />;
// }

export function InteractiveModel() {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Model />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

