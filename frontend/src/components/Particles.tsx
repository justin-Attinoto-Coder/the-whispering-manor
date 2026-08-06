import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Particles() {
  const points = useRef<THREE.Points>(null!)

  const { positions, velocities } = useMemo(() => {
    const count = 2200
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28
      pos[i * 3 + 1] = Math.random() * 4.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 34

      vel[i * 3] = (Math.random() - 0.5) * 0.0025
      vel[i * 3 + 1] = Math.random() * 0.0035 + 0.0008
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.0025
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(() => {
    if (!points.current) return
    const posArray = points.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < posArray.length; i += 3) {
      posArray[i] += velocities[i]
      posArray[i + 1] += velocities[i + 1]
      posArray[i + 2] += velocities[i + 2]

      if (posArray[i + 1] > 5.0) {
        posArray[i + 1] = 0.1
        posArray[i] = (Math.random() - 0.5) * 28
        posArray[i + 2] = (Math.random() - 0.5) * 34
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#c8bba5"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
