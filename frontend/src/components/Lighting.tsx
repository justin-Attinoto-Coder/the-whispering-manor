import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FlickeringCandle({
  position,
  baseIntensity = 1.4,
  color = '#ffb366'
}: {
  position: [number, number, number]
  baseIntensity?: number
  color?: string
}) {
  const light = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    if (!light.current) return
    const t = clock.elapsedTime
    const flicker =
      Math.sin(t * 6.8 + position[0] * 2.1) * 0.18 +
      Math.sin(t * 11.4 + position[2] * 1.7) * 0.11 +
      (Math.random() - 0.5) * 0.14
    light.current.intensity = Math.max(0.4, baseIntensity + flicker)
  })

  return (
    <pointLight
      ref={light}
      position={position}
      color={color}
      intensity={baseIntensity}
      distance={11}
      decay={2}
      castShadow
    />
  )
}

export function Lighting() {
  const ambient = useRef<THREE.AmbientLight>(null!)
  const flash = useRef(0)

  useFrame(() => {
    // Occasional lightning
    if (Math.random() < 0.0035) {
      flash.current = 1.6
    }
    flash.current *= 0.86

    if (ambient.current) {
      ambient.current.intensity = 0.14 + flash.current
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={0.14} color="#1c1824" />

      {/* Cool moonlight through windows */}
      <directionalLight
        position={[10, 16, -8]}
        intensity={0.45}
        color="#9bb6ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Warm fill from far end */}
      <pointLight
        position={[0, 3.2, -16]}
        color="#ff9955"
        intensity={1.1}
        distance={14}
        decay={2}
      />

      {/* Candles throughout the house */}
      <FlickeringCandle position={[-5.2, 2.15, 5.5]} baseIntensity={1.5} />
      <FlickeringCandle position={[5.2, 2.15, 5.5]} baseIntensity={1.5} />
      <FlickeringCandle position={[-4.8, 2.15, -2]} baseIntensity={1.2} />
      <FlickeringCandle position={[4.8, 2.15, -2]} baseIntensity={1.2} />
      <FlickeringCandle position={[-8.5, 2.0, 1]} baseIntensity={1.0} />
      <FlickeringCandle position={[8.5, 2.0, 1]} baseIntensity={1.0} />
      <FlickeringCandle position={[0, 2.5, -11]} baseIntensity={1.7} />
      <FlickeringCandle position={[-6, 2.1, -12]} baseIntensity={0.95} />
      <FlickeringCandle position={[6, 2.1, -12]} baseIntensity={0.95} />
      <FlickeringCandle position={[0, 2.3, 10]} baseIntensity={1.3} />
    </>
  )
}
