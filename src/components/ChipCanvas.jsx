import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Subtle floorplan background grid
function FloorplanBackground() {
  const groupRef = useRef()
  const blocks = useMemo(() => {
    const layout = [
      { x: -2.8, z: -2.0, w: 1.6, d: 1.2, color: '#0d2040', border: '#4a9eff' },
      { x: -1.0, z: -2.0, w: 1.6, d: 1.2, color: '#0d1a35', border: '#7c3aed' },
      { x: 0.8,  z: -2.0, w: 1.0, d: 2.0, color: '#1a1020', border: '#c9a84c' },
      { x: -2.8, z: -0.6, w: 3.4, d: 1.0, color: '#0a1828', border: '#22d3ee' },
      { x: -2.8, z:  0.6, w: 2.0, d: 1.6, color: '#140d20', border: '#f0abfc' },
      { x: -0.6, z:  0.6, w: 2.2, d: 1.6, color: '#0a1a10', border: '#4ade80' },
    ]
    return layout
  }, [])

  return (
    <group ref={groupRef} position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0.3]}>
      {/* Outer die boundary */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(6.4, 0.02, 4.6)]} />
        <lineBasicMaterial color="#4a9eff" transparent opacity={0.18} />
      </lineSegments>
      {/* Floor blocks */}
      {blocks.map((b, i) => (
        <group key={i} position={[b.x + b.w / 2, 0, b.z + b.d / 2]}>
          <mesh>
            <boxGeometry args={[b.w, 0.02, b.d]} />
            <meshStandardMaterial color={b.color} transparent opacity={0.5} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(b.w, 0.02, b.d)]} />
            <lineBasicMaterial color={b.border} transparent opacity={0.25} />
          </lineSegments>
        </group>
      ))}
      {/* Routing traces */}
      {[-2.0, -1.2, -0.4, 0.4, 1.2, 2.0].map((x, i) => {
        const pts = [new THREE.Vector3(x, 0.02, -2.3), new THREE.Vector3(x, 0.02, 2.3)]
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        return <line key={`v${i}`} geometry={geo}><lineBasicMaterial color="#4a9eff" transparent opacity={0.06} /></line>
      })}
      {[-1.8, -1.0, -0.2, 0.6, 1.4].map((z, i) => {
        const pts = [new THREE.Vector3(-3.2, 0.02, z), new THREE.Vector3(1.8, 0.02, z)]
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        return <line key={`h${i}`} geometry={geo}><lineBasicMaterial color="#4a9eff" transparent opacity={0.06} /></line>
      })}
    </group>
  )
}

// Isometric-style die that rotates
function IsometricDie() {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.22
    groupRef.current.rotation.x = 0.52  // isometric tilt ~30deg
  })

  const routeLines = useMemo(() => {
    const lines = []
    const s = 1.45
    const count = 12
    for (let i = 0; i < count; i++) {
      const pos = -s + (i / (count - 1)) * s * 2
      // H lines
      const hg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-s, 0.155, pos), new THREE.Vector3(s, 0.155, pos)
      ])
      lines.push(<line key={`h${i}`} geometry={hg}><lineBasicMaterial color="#4a9eff" transparent opacity={0.55} /></line>)
      // V lines
      const vg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(pos, 0.155, -s), new THREE.Vector3(pos, 0.155, s)
      ])
      lines.push(<line key={`v${i}`} geometry={vg}><lineBasicMaterial color="#7c3aed" transparent opacity={0.4} /></line>)
    }
    // Gold power stripes
    ;[-0.8, -0.3, 0.2, 0.7].forEach((x, i) => {
      const pg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0.158, -s), new THREE.Vector3(x, 0.158, s)
      ])
      lines.push(<line key={`p${i}`} geometry={pg}><lineBasicMaterial color="#c9a84c" transparent opacity={0.7} /></line>)
    })
    return lines
  }, [])

  const padRing = useMemo(() => {
    const pads = []
    const s = 1.5
    const n = 8
    for (let i = 0; i < n; i++) {
      const t = -s + 0.1 + (i / (n - 1)) * (s * 2 - 0.2)
      ;[[s - 0.05, 0.16, t], [-(s - 0.05), 0.16, t], [t, 0.16, s - 0.05], [t, 0.16, -(s - 0.05)]].forEach((pos, j) => {
        pads.push(
          <mesh key={`${i}-${j}`} position={pos}>
            <boxGeometry args={[0.07, 0.02, 0.07]} />
            <meshStandardMaterial color="#c9a84c" metalness={0.95} roughness={0.05} />
          </mesh>
        )
      })
    }
    return pads
  }, [])

  const cellRows = useMemo(() => (
    Array.from({ length: 14 }, (_, i) => (
      <mesh key={i} position={[0, 0.06, -1.35 + i * 0.21]}>
        <boxGeometry args={[2.8, 0.02, 0.17]} />
        <meshStandardMaterial color={i % 2 === 0 ? '#0d2a1a' : '#0a1f14'} transparent opacity={0.75} />
      </mesh>
    ))
  ), [])

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Die body layers */}
      {[
        { y: -0.08, h: 0.08, color: '#080c14', m: 0.9, r: 0.2 },
        { y: -0.02, h: 0.05, color: '#0a1020', m: 0.85, r: 0.25 },
        { y:  0.03, h: 0.04, color: '#0d1428', m: 0.8, r: 0.3 },
        { y:  0.08, h: 0.04, color: '#101828', m: 0.75, r: 0.3 },
        { y:  0.13, h: 0.04, color: '#121c2e', m: 0.7, r: 0.35 },
        { y:  0.17, h: 0.02, color: '#161e30', m: 0.6, r: 0.4 },
      ].map((l, i) => (
        <mesh key={i} position={[0, l.y, 0]}>
          <boxGeometry args={[3.0 - i * 0.04, l.h, 3.0 - i * 0.04]} />
          <meshStandardMaterial color={l.color} metalness={l.m} roughness={l.r} />
        </mesh>
      ))}
      {cellRows}
      {routeLines}
      {padRing}
      {/* Glowing core block */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.6]} />
        <meshStandardMaterial color="#4a9eff" emissive="#4a9eff" emissiveIntensity={0.6} transparent opacity={0.85} />
      </mesh>
      {/* Die outline edge */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.02, 0.32, 3.02)]} />
        <lineBasicMaterial color="#4a9eff" transparent opacity={0.6} />
      </lineSegments>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 10, 6]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, 4, -4]} intensity={0.5} color="#9ac0ff" />
      <pointLight position={[0, 5, 0]} intensity={1.0} color="#4a9eff" />
      <pointLight position={[2, 2, 2]} intensity={0.4} color="#c9a84c" />
      <FloorplanBackground />
      <IsometricDie />
    </>
  )
}

export default function ChipCanvas({ style }) {
  return (
    <Canvas
      style={style}
      camera={{ position: [3.5, 4.5, 5.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
