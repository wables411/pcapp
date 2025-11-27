import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

function FloatingGlasses() {
  const glassesRef = useRef<Mesh[]>([])

  useFrame(({ clock, mouse }) => {
    glassesRef.current.forEach((glass, i) => {
      if (glass) {
        const time = clock.getElapsedTime()
        const offset = i * 0.5
        
        glass.position.y = Math.sin(time + offset) * 0.5
        glass.rotation.y = time * 0.2 + offset
        glass.rotation.x = Math.sin(time * 0.5 + offset) * 0.2
        
        // React to mouse
        glass.position.x += (mouse.x * 2 - glass.position.x) * 0.1
        glass.position.z += (mouse.y * 2 - glass.position.z) * 0.1
      }
    })
  })

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) glassesRef.current[i] = el
          }}
          position={[
            (i - 1) * 2.5,
            Math.sin(i) * 0.5,
            Math.cos(i) * 0.5,
          ]}
        >
          <boxGeometry args={[1, 0.3, 0.1]} />
          <meshStandardMaterial
            color="#00ff41"
            emissive="#00ff41"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
          {/* Glasses frame */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[1, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#00ff41"
              emissive="#00ff41"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[1, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#00ff41"
              emissive="#00ff41"
              emissiveIntensity={0.3}
            />
          </mesh>
        </mesh>
      ))}
    </>
  )
}

export default FloatingGlasses

