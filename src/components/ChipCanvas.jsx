import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function ChipDie() {
  const group = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.18
    group.current.rotation.x = Math.sin(t * 0.12) * 0.12 + 0.25
  })

  const layers = useMemo(() => {
    const items = []
    const size = 3.2

    // Substrate base
    items.push({ y: -0.22, h: 0.12, color: '#0d1117', opacity: 1 })
    // Diffusion layer
    items.push({ y: -0.13, h: 0.06, color: '#0a2a1e', opacity: 1 })
    // M1 layer
    items.push({ y: -0.06, h: 0.04, color: '#1a0a0a', opacity: 0.9 })
    // M2
    items.push({ y: -0.01, h: 0.04, color: '#1a1208', opacity: 0.85 })
    // M3 power
    items.push({ y: 0.04, h: 0.04, color: '#141a08', opacity: 0.8 })
    // Upper metal
    items.push({ y: 0.09, h: 0.04, color: '#080e1a', opacity: 0.75 })
    // Passivation top
    items.push({ y: 0.14, h: 0.03, color: '#1a1a2a', opacity: 0.7 })

    return items.map((l, i) => (
      <mesh key={i} position={[0, l.y, 0]}>
        <boxGeometry args={[size - i * 0.04, l.h, size - i * 0.04]} />
        <meshStandardMaterial color={l.color} metalness={0.8} roughness={0.3} transparent opacity={l.opacity} />
      </mesh>
    ))
  }, [])

  const metalRoutes = useMemo(() => {
    const lines = []
    const count = 18
    const size = 3.0

    for (let i = 0; i < count; i++) {
      const x = -size / 2 + (i / (count - 1)) * size
      // Horizontal M1 lines (red)
      const hPts = [new THREE.Vector3(-size / 2, 0.02, x), new THREE.Vector3(size / 2, 0.02, x)]
      const hGeo = new THREE.BufferGeometry().setFromPoints(hPts)
      lines.push(<line key={`h${i}`} geometry={hGeo}><lineBasicMaterial color="#8b1a1a" transparent opacity={0.7} /></line>)

      // Vertical M2 lines (orange)
      const vPts = [new THREE.Vector3(x, 0.06, -size / 2), new THREE.Vector3(x, 0.06, size / 2)]
      const vGeo = new THREE.BufferGeometry().setFromPoints(vPts)
      lines.push(<line key={`v${i}`} geometry={vGeo}><lineBasicMaterial color="#7a4a10" transparent opacity={0.6} /></line>)
    }

    // Power stripes M3 (gold) - fewer, wider spaced
    for (let i = 0; i < 5; i++) {
      const x = -1.4 + i * 0.7
      const pPts = [new THREE.Vector3(x, 0.10, -1.5), new THREE.Vector3(x, 0.10, 1.5)]
      const pGeo = new THREE.BufferGeometry().setFromPoints(pPts)
      lines.push(<line key={`p${i}`} geometry={pGeo}><lineBasicMaterial color="#c9a84c" transparent opacity={0.9} /></line>)
    }

    return lines
  }, [])

  const padRing = useMemo(() => {
    const pads = []
    const size = 3.0
    const padCount = 10
    const positions = []

    for (let i = 0; i < padCount; i++) {
      positions.push([-size / 2 + 0.06, 0.17, -size / 2 + (i / (padCount - 1)) * size])
      positions.push([size / 2 - 0.06, 0.17, -size / 2 + (i / (padCount - 1)) * size])
      positions.push([-size / 2 + (i / (padCount - 1)) * size, 0.17, -size / 2 + 0.06])
      positions.push([-size / 2 + (i / (padCount - 1)) * size, 0.17, size / 2 - 0.06])
    }

    return positions.map((pos, i) => (
      <mesh key={i} position={pos}>
        <boxGeometry args={[0.09, 0.025, 0.09]} />
        <meshStandardMaterial color="#c0c8d0" metalness={0.95} roughness={0.1} />
      </mesh>
    ))
  }, [])

  // Standard cell rows
  const cellRows = useMemo(() => {
    const rows = []
    for (let i = 0; i < 12; i++) {
      const z = -1.4 + i * 0.25
      rows.push(
        <mesh key={i} position={[0, -0.09, z]}>
          <boxGeometry args={[2.8, 0.015, 0.18]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#0d2a1a' : '#0a1f14'} transparent opacity={0.8} />
        </mesh>
      )
    }
    return rows
  }, [])

  return (
    <group ref={group}>
      {layers}
      {metalRoutes}
      {padRing}
      {cellRows}
      {/* Die outline edge highlight */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.22, 0.46, 3.22)]} />
        <lineBasicMaterial color="#3a6ea8" transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

export default function ChipCanvas({ style }) {
  return (
    <Canvas
      style={style}
      camera={{ position: [0, 3.5, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, 3, -4]} intensity={0.4} color="#b0c8ff" />
      <pointLight position={[0, 4, 0]} intensity={0.6} color="#ffd580" />
      <ChipDie />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  )
}
