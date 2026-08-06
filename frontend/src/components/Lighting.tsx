import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FlickeringCandle({ position, baseIntensity = 1.1 }: { position: [number, number, number], baseIntensity?: number }) {
  const light = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    if (!light.current) return
    const t = clock.elapsedTime
    const flicker = Math.sin(t * 7.3 + position[0]) * 0.15 +
                    Math.sin(t * 13.1 + position[2]) * 0.08 +
                    (Math.random() - 0.5) * 0.12
    light.current.intensity = baseIntensity + flicker
  })

  return (
    <pointLight
      ref={light}
      position={position}
      color="#ffaa55"
      intensity={baseIntensity}
      distance={9}
      decay={2}
      castShadow
    />
  )
}

export function Lighting() {
  const ambient = useRef<THREE.AmbientLight>(null!)

  useFrame(() => {
    // Occasional lightning flash
    if (Math.random() < 0.004) {
      if (ambient.current) ambient.current.intensity = 1.8
      setTimeout(() => {
        if (ambient.current) ambient.current.intensity = 0.08
      }, 80 + Math.random() * 120)
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={0.08} color="#1a1520" />

      {/* Moonlight */}
      <directionalLight
        position={[8, 18, -12]}
        intensity={0.28}
        color="#8ea8ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Candles */}
      <FlickeringCandle position={[-4.2, 2.1, 3.5]} />
      <FlickeringCandle position={[4.2, 2.1, 3.5]} />
      <FlickeringCandle position={[-3.8, 2.1, -4.5]} baseIntensity={0.9} />
      <FlickeringCandle position={[3.8, 2.1, -4.5]} baseIntensity={0.9} />
      <FlickeringCandle position={[0, 2.4, -9.5]} baseIntensity={1.3} />
      <FlickeringCandle position={[-7.5, 2.0, 0]} baseIntensity={0.75} />
      <FlickeringCandle position={[7.5, 2.0, 0]} baseIntensity={0.75} />
    </>
  )
}
