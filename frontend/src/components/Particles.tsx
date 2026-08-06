import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Particles() {
  const points = useRef<THREE.Points>(null!)

  const { positions, velocities } = useMemo(() => {
    const count = 1800
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = Math.random() * 4.2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26

      vel[i * 3] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = Math.random() * 0.004 + 0.001
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003
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

      if (posArray[i + 1] > 4.5) {
        posArray[i + 1] = 0
        posArray[i] = (Math.random() - 0.5) * 22
        posArray[i + 2] = (Math.random() - 0.5) * 26
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
        size={0.035}
        color="#c4b8a2"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
