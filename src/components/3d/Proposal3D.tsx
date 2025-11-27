import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface Proposal3DProps {
  forVotes: number
  againstVotes: number
  abstainVotes: number
}

function Proposal3D({ forVotes, againstVotes, abstainVotes }: Proposal3DProps) {
  const forRef = useRef<Mesh>(null)
  const againstRef = useRef<Mesh>(null)
  const abstainRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    if (forRef.current) {
      forRef.current.rotation.y = time * 0.5
      forRef.current.scale.y = 1 + (forVotes / 100) * 0.5
    }
    if (againstRef.current) {
      againstRef.current.rotation.y = -time * 0.5
      againstRef.current.scale.y = 1 + (againstVotes / 100) * 0.5
    }
    if (abstainRef.current) {
      abstainRef.current.rotation.y = time * 0.3
      abstainRef.current.scale.y = 1 + (abstainVotes / 100) * 0.5
    }
  })

  return (
    <group>
      <mesh ref={forRef} position={[-1, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial
          color="#00ff41"
          emissive="#00ff41"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh ref={againstRef} position={[1, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial
          color="#ff0040"
          emissive="#ff0040"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh ref={abstainRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

export default Proposal3D

