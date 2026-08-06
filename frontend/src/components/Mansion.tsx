import * as THREE from 'three'

function Wall({ position, args, rotation = [0, 0, 0] as [number, number, number] }: {
  position: [number, number, number]
  args: [number, number, number]
  rotation?: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#1c1814" roughness={0.92} metalness={0.05} />
    </mesh>
  )
}

function Floor({ position, args }: { position: [number, number, number], args: [number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial color="#12100e" roughness={0.85} metalness={0.1} />
    </mesh>
  )
}

export function Mansion() {
  return (
    <group>
      {/* Main floor */}
      <Floor position={[0, 0, 0]} args={[24, 28]} />

      {/* Outer walls */}
      <Wall position={[0, 2.5, -14]} args={[24, 5, 0.4]} />
      <Wall position={[0, 2.5, 14]} args={[24, 5, 0.4]} />
      <Wall position={[-12, 2.5, 0]} args={[0.4, 5, 28]} />
      <Wall position={[12, 2.5, 0]} args={[0.4, 5, 28]} />

      {/* Entrance hall pillars */}
      <Wall position={[-5, 2.2, 6]} args={[0.5, 4.4, 0.5]} />
      <Wall position={[5, 2.2, 6]} args={[0.5, 4.4, 0.5]} />

      {/* Central corridor walls */}
      <Wall position={[-3.5, 2.2, -1]} args={[0.35, 4.4, 12]} />
      <Wall position={[3.5, 2.2, -1]} args={[0.35, 4.4, 12]} />

      {/* Side rooms */}
      <Wall position={[-7.5, 2.2, -3]} args={[6, 4.4, 0.35]} />
      <Wall position={[7.5, 2.2, -3]} args={[6, 4.4, 0.35]} />

      {/* Back room / library area */}
      <Wall position={[-5, 2.2, -9]} args={[0.35, 4.4, 6]} />
      <Wall position={[5, 2.2, -9]} args={[0.35, 4.4, 6]} />

      {/* Simple staircase */}
      <mesh position={[0, 0.4, -11.5]} receiveShadow>
        <boxGeometry args={[3.2, 0.8, 2.5]} />
        <meshStandardMaterial color="#1a1612" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.1, -12.3]} receiveShadow>
        <boxGeometry args={[3.2, 0.8, 1.8]} />
        <meshStandardMaterial color="#1a1612" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 28]} />
        <meshStandardMaterial color="#0e0c0a" roughness={1} />
      </mesh>

      {/* Window light planes */}
      <mesh position={[-11.7, 2.8, 4]}>
        <planeGeometry args={[0.1, 2.2]} />
        <meshBasicMaterial color="#9bb4ff" transparent opacity={0.15} />
      </mesh>
      <mesh position={[11.7, 2.8, 4]}>
        <planeGeometry args={[0.1, 2.2]} />
        <meshBasicMaterial color="#9bb4ff" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}
