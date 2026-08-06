import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Mansion } from './components/Mansion'
import { Lighting } from './components/Lighting'
import { Particles } from './components/Particles'
import { PostProcessing } from './components/PostProcessing'
import { Player } from './components/Player'
import { UI } from './components/UI'
import * as THREE from 'three'

export default function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 70, near: 0.1, far: 90, position: [0, 1.7, 9] }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#08070b']} />
        {/* Slightly less aggressive fog so architecture reads better while staying dark */}
        <fog attach="fog" args={['#0b0a10', 6, 32]} />

        <Suspense fallback={null}>
          <Lighting />
          <Mansion />
          <Particles />
          <Player />
          <PostProcessing />
        </Suspense>
      </Canvas>

      <UI />
    </>
  )
}
