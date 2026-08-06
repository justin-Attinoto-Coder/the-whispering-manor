import { PointerLockControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Player() {
  const { camera } = useThree()
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const keys = useRef({ forward: false, backward: false, left: false, right: false })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.forward = true
      if (e.code === 'KeyS') keys.current.backward = true
      if (e.code === 'KeyA') keys.current.left = true
      if (e.code === 'KeyD') keys.current.right = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.forward = false
      if (e.code === 'KeyS') keys.current.backward = false
      if (e.code === 'KeyA') keys.current.left = false
      if (e.code === 'KeyD') keys.current.right = false
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    const speed = 4.2
    direction.current.set(0, 0, 0)

    if (keys.current.forward) direction.current.z -= 1
    if (keys.current.backward) direction.current.z += 1
    if (keys.current.left) direction.current.x -= 1
    if (keys.current.right) direction.current.x += 1

    direction.current.normalize()

    const front = new THREE.Vector3()
    camera.getWorldDirection(front)
    front.y = 0
    front.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(front, new THREE.Vector3(0, 1, 0)).normalize()

    velocity.current.set(0, 0, 0)
    velocity.current.addScaledVector(front, -direction.current.z * speed * delta)
    velocity.current.addScaledVector(right, direction.current.x * speed * delta)

    camera.position.add(velocity.current)
    camera.position.y = 1.7

    // Simple bounds
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -11, 11)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -14, 12)
  })

  return <PointerLockControls />
}
