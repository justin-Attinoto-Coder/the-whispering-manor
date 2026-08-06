import { PointerLockControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Player() {
  const { camera } = useThree()
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false
  })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.forward = true
      if (e.code === 'KeyS') keys.current.backward = true
      if (e.code === 'KeyA') keys.current.left = true
      if (e.code === 'KeyD') keys.current.right = true
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.current.sprint = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.forward = false
      if (e.code === 'KeyS') keys.current.backward = false
      if (e.code === 'KeyA') keys.current.left = false
      if (e.code === 'KeyD') keys.current.right = false
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.current.sprint = false
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    const baseSpeed = 3.8
    const sprintMultiplier = keys.current.sprint ? 1.85 : 1
    const speed = baseSpeed * sprintMultiplier

    direction.current.set(0, 0, 0)

    if (keys.current.forward) direction.current.z -= 1
    if (keys.current.backward) direction.current.z += 1
    if (keys.current.left) direction.current.x -= 1
    if (keys.current.right) direction.current.x += 1

    if (direction.current.lengthSq() > 0) {
      direction.current.normalize()
    }

    const front = new THREE.Vector3()
    camera.getWorldDirection(front)
    front.y = 0
    front.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(front, new THREE.Vector3(0, 1, 0)).normalize()

    // Smooth acceleration / deceleration
    const targetVelocity = new THREE.Vector3()
    targetVelocity.addScaledVector(front, -direction.current.z * speed)
    targetVelocity.addScaledVector(right, direction.current.x * speed)

    velocity.current.lerp(targetVelocity, 1 - Math.exp(-12 * delta))

    camera.position.addScaledVector(velocity.current, delta)
    camera.position.y = 1.7

    // Soft bounds
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -13.5, 13.5)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -18, 15)
  })

  return <PointerLockControls />
}
