import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import FloatingGlasses from './FloatingGlasses'

function Hero3D() {
  return (
    <Canvas className="w-full h-full">
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff41" />
        
        <FloatingGlasses />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}

export default Hero3D

