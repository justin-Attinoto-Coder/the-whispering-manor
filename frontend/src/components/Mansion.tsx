import * as THREE from 'three'

const wallMat = new THREE.MeshStandardMaterial({
  color: '#1a1612',
  roughness: 0.88,
  metalness: 0.04
})

const darkWood = new THREE.MeshStandardMaterial({
  color: '#120f0c',
  roughness: 0.82,
  metalness: 0.06
})

const trimMat = new THREE.MeshStandardMaterial({
  color: '#2a241c',
  roughness: 0.75,
  metalness: 0.08
})

const floorMat = new THREE.MeshStandardMaterial({
  color: '#0e0c0a',
  roughness: 0.78,
  metalness: 0.12
})

function Box({
  position,
  args,
  rotation = [0, 0, 0],
  material = wallMat
}: {
  position: [number, number, number]
  args: [number, number, number]
  rotation?: [number, number, number]
  material?: THREE.Material
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow material={material}>
      <boxGeometry args={args} />
    </mesh>
  )
}

function DoorFrame({ position, rotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Left post */}
      <Box position={[-1.15, 1.35, 0]} args={[0.18, 2.7, 0.22]} material={trimMat} />
      {/* Right post */}
      <Box position={[1.15, 1.35, 0]} args={[0.18, 2.7, 0.22]} material={trimMat} />
      {/* Top lintel */}
      <Box position={[0, 2.75, 0]} args={[2.5, 0.22, 0.24]} material={trimMat} />
    </group>
  )
}

function WindowFrame({ position, rotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Box position={[0, 0, 0]} args={[1.8, 2.4, 0.12]} material={trimMat} />
      {/* Glass glow */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshBasicMaterial color="#8eaaff" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function Bookshelf({ position, rotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Box position={[0, 1.4, 0]} args={[2.4, 2.8, 0.45]} material={darkWood} />
      {/* Shelves */}
      <Box position={[0, 0.7, 0.18]} args={[2.2, 0.08, 0.35]} material={trimMat} />
      <Box position={[0, 1.4, 0.18]} args={[2.2, 0.08, 0.35]} material={trimMat} />
      <Box position={[0, 2.1, 0.18]} args={[2.2, 0.08, 0.35]} material={trimMat} />
    </group>
  )
}

function Table({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box position={[0, 0.78, 0]} args={[1.6, 0.08, 0.9]} material={darkWood} />
      <Box position={[-0.65, 0.38, -0.35]} args={[0.1, 0.76, 0.1]} material={darkWood} />
      <Box position={[0.65, 0.38, -0.35]} args={[0.1, 0.76, 0.1]} material={darkWood} />
      <Box position={[-0.65, 0.38, 0.35]} args={[0.1, 0.76, 0.1]} material={darkWood} />
      <Box position={[0.65, 0.38, 0.35]} args={[0.1, 0.76, 0.1]} material={darkWood} />
    </group>
  )
}

export function Mansion() {
  return (
    <group>
      {/* ===== FLOORS ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={floorMat}>
        <planeGeometry args={[30, 36]} />
      </mesh>

      {/* ===== OUTER WALLS ===== */}
      <Box position={[0, 2.6, -18]} args={[30, 5.2, 0.45]} />
      <Box position={[0, 2.6, 16]} args={[30, 5.2, 0.45]} />
      <Box position={[-15, 2.6, -1]} args={[0.45, 5.2, 34]} />
      <Box position={[15, 2.6, -1]} args={[0.45, 5.2, 34]} />

      {/* ===== CEILING ===== */}
      <mesh position={[0, 5.15, -1]} rotation={[Math.PI / 2, 0, 0]} material={darkWood}>
        <planeGeometry args={[30, 34]} />
      </mesh>

      {/* Ceiling beams */}
      {[-12, -6, 0, 6, 12].map((z) => (
        <Box key={z} position={[0, 5.0, z]} args={[28, 0.25, 0.35]} material={trimMat} />
      ))}

      {/* ===== ENTRANCE HALL ===== */}
      {/* Side walls of entrance */}
      <Box position={[-5.5, 2.4, 8]} args={[0.35, 4.8, 10]} />
      <Box position={[5.5, 2.4, 8]} args={[0.35, 4.8, 10]} />

      {/* Entrance pillars */}
      <Box position={[-4.2, 2.2, 4]} args={[0.55, 4.4, 0.55]} material={trimMat} />
      <Box position={[4.2, 2.2, 4]} args={[0.55, 4.4, 0.55]} material={trimMat} />
      <Box position={[-4.2, 2.2, 11]} args={[0.55, 4.4, 0.55]} material={trimMat} />
      <Box position={[4.2, 2.2, 11]} args={[0.55, 4.4, 0.55]} material={trimMat} />

      {/* Baseboards */}
      <Box position={[0, 0.12, 8]} args={[10.5, 0.24, 0.12]} material={trimMat} />

      {/* ===== CENTRAL CORRIDOR ===== */}
      <Box position={[-3.8, 2.4, -3]} args={[0.35, 4.8, 16]} />
      <Box position={[3.8, 2.4, -3]} args={[0.35, 4.8, 16]} />

      {/* Corridor door frames */}
      <DoorFrame position={[-3.8, 0, 2]} rotation={[0, Math.PI / 2, 0]} />
      <DoorFrame position={[3.8, 0, 2]} rotation={[0, -Math.PI / 2, 0]} />
      <DoorFrame position={[-3.8, 0, -6]} rotation={[0, Math.PI / 2, 0]} />
      <DoorFrame position={[3.8, 0, -6]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ===== LEFT SIDE ROOMS ===== */}
      {/* Dividing walls */}
      <Box position={[-9.5, 2.4, 2]} args={[11, 4.8, 0.35]} />
      <Box position={[-9.5, 2.4, -5]} args={[11, 4.8, 0.35]} />

      <DoorFrame position={[-5.5, 0, 2]} />
      <DoorFrame position={[-5.5, 0, -5]} />

      {/* Furniture left */}
      <Bookshelf position={[-12.5, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
      <Bookshelf position={[-12.5, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
      <Table position={[-9, 0, 6.5]} />

      {/* ===== RIGHT SIDE ROOMS ===== */}
      <Box position={[9.5, 2.4, 2]} args={[11, 4.8, 0.35]} />
      <Box position={[9.5, 2.4, -5]} args={[11, 4.8, 0.35]} />

      <DoorFrame position={[5.5, 0, 2]} />
      <DoorFrame position={[5.5, 0, -5]} />

      <Bookshelf position={[12.5, 0, 5]} rotation={[0, -Math.PI / 2, 0]} />
      <Bookshelf position={[12.5, 0, -1]} rotation={[0, -Math.PI / 2, 0]} />
      <Table position={[9, 0, 6.5]} />

      {/* ===== BACK LIBRARY / GRAND ROOM ===== */}
      <Box position={[-6, 2.4, -12]} args={[0.35, 4.8, 8]} />
      <Box position={[6, 2.4, -12]} args={[0.35, 4.8, 8]} />

      {/* Large doorway into grand room */}
      <DoorFrame position={[0, 0, -8]} />
      <Box position={[-2.4, 2.4, -8]} args={[2.2, 4.8, 0.35]} />
      <Box position={[2.4, 2.4, -8]} args={[2.2, 4.8, 0.35]} />

      {/* Bookshelves in grand room */}
      <Bookshelf position={[-10, 0, -14]} />
      <Bookshelf position={[-6.5, 0, -14]} />
      <Bookshelf position={[6.5, 0, -14]} />
      <Bookshelf position={[10, 0, -14]} />

      <Table position={[0, 0, -13]} />

      {/* ===== STAIRCASE ===== */}
      <Box position={[0, 0.35, -15.5]} args={[4.2, 0.7, 3.2]} material={darkWood} />
      <Box position={[0, 0.95, -16.4]} args={[4.2, 0.7, 2.4]} material={darkWood} />
      <Box position={[0, 1.55, -17.1]} args={[4.2, 0.7, 1.8]} material={darkWood} />
      <Box position={[0, 2.15, -17.6]} args={[4.2, 0.7, 1.3]} material={darkWood} />

      {/* Stair rail posts */}
      <Box position={[-2.0, 1.6, -15.2]} args={[0.15, 2.2, 0.15]} material={trimMat} />
      <Box position={[2.0, 1.6, -15.2]} args={[0.15, 2.2, 0.15]} material={trimMat} />

      {/* ===== WINDOWS ===== */}
      <WindowFrame position={[-14.7, 2.6, 6]} rotation={[0, Math.PI / 2, 0]} />
      <WindowFrame position={[-14.7, 2.6, -2]} rotation={[0, Math.PI / 2, 0]} />
      <WindowFrame position={[14.7, 2.6, 6]} rotation={[0, -Math.PI / 2, 0]} />
      <WindowFrame position={[14.7, 2.6, -2]} rotation={[0, -Math.PI / 2, 0]} />
      <WindowFrame position={[-8, 2.6, -17.7]} />
      <WindowFrame position={[8, 2.6, -17.7]} />

      {/* ===== EXTRA TRIM / MOLDING ===== */}
      {/* Crown molding-ish */}
      <Box position={[0, 4.85, 8]} args={[11, 0.18, 0.2]} material={trimMat} />
      <Box position={[0, 4.85, -3]} args={[7.2, 0.18, 0.2]} material={trimMat} />

      {/* Floor runners / rugs as dark planes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 6]} receiveShadow>
        <planeGeometry args={[4.5, 9]} />
        <meshStandardMaterial color="#1a1210" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -4]} receiveShadow>
        <planeGeometry args={[3.8, 12]} />
        <meshStandardMaterial color="#1a1210" roughness={0.95} />
      </mesh>
    </group>
  )
}
