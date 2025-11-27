import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Mesh, TextureLoader } from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

interface NFTPreview3DProps {
  imageUrl: string
  tokenId: string
}

function NFTPreview3D({ imageUrl }: NFTPreview3DProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useLoader(TextureLoader, imageUrl)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      if (hovered) {
        meshRef.current.rotation.x += 0.01
      }
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00ff41" />
      
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      
      <OrbitControls enableZoom={true} enablePan={true} />
    </>
  )
}

export default NFTPreview3D

