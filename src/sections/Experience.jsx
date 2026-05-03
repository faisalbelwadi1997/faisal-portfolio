import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const experiences = [
  {
    company: 'Microsoft',
    role: 'Silicon PD CAD Engineer 2',
    period: 'Oct 2024 – Present',
    location: 'Bengaluru, India',
    node: '3nm / 2nm',
    color: '#0078d4',
    highlights: [
      'Leading 4-member regression team for zero-defect Genesys releases across India, US & APAC',
      'Reduced regression cycle time by 2 weeks by building standalone validation environments',
      'Scaled regression infra 6× — from 4 to 25 testcases with Azure DevOps CI/CD',
      'Enabled Hybrid FC + Innovus PNR flow integration delivering ~15% PPA improvement',
      'Enhanced Physical Verification flows using Calibre (v2lvs + netlist generation)',
    ],
  },
  {
    company: 'Cadence Design Systems',
    role: 'Lead Physical Design Engineer',
    period: 'Apr 2024 – Sep 2024',
    location: 'Pune, India',
    node: '7nm',
    color: '#c9a84c',
    highlights: [
      'Owned full RTL-to-GDSII for high-frequency Vision processor cores (3M+ instances, multiple clocks)',
      'Built Cerebrus ML-based PPA optimization — 14% freq gain, 10% leakage, 7% active power savings',
      'Developed FuSA constrained routing methodology for ISO 26262 multicore designs',
      'Built scenario-replay flow reducing Cerebrus runtime by 10× for similar configurations',
      'Developed automated floorplan resizing utility maximising utilisation without manual tuning',
    ],
  },
  {
    company: 'Cadence Design Systems',
    role: 'Physical Design Engineer II',
    period: 'Aug 2020 – Mar 2024',
    location: 'Pune, India',
    node: '7nm–28nm',
    color: '#1a56db',
    highlights: [
      'Implemented Mixed-Placer flow replacing manual placement — ±3% PPA gain, 60% faster PnR turnaround',
      'Delivered complete backend closure (CTS, PnR, STA, ECO, IR-Drop) for multiple Tensilica IPs',
      'Reduced backend turnaround from weeks to 1 week via ETM bottom-up flow (2.5M+ instances)',
      'Eliminated ~20ps hold slack on slow data paths via targeted floorplan techniques',
    ],
  },
  {
    company: 'Cadence Design Systems',
    role: 'Physical Design Intern',
    period: 'Jul 2019 – Jul 2020',
    location: 'Pune, India',
    node: '16nm / 28nm',
    color: '#6b7280',
    highlights: [
      'Built Physical Verification flows using PVS/Pegasus for 28nm and 16nm (DRC/LVS)',
      'Built LSF-based distributed execution within EDA tools — increased farm throughput 6×',
    ],
  },
]

function TimelinePath({ activeIdx }) {
  const lineRef = useRef()
  const dotsRef = useRef([])

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.003
    }
  })

  const points = experiences.map((_, i) => new THREE.Vector3(
    Math.sin(i * 1.2) * 1.2,
    1.5 - i * 1.0,
    Math.cos(i * 1.2) * 0.8
  ))

  const curve = new THREE.CatmullRomCurve3(points)
  const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.03, 8, false)

  return (
    <group ref={lineRef}>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial color="#e2e0db" metalness={0.3} roughness={0.7} />
      </mesh>
      {points.map((pt, i) => (
        <mesh key={i} position={pt}>
          <sphereGeometry args={[i === activeIdx ? 0.14 : 0.09, 16, 16]} />
          <meshStandardMaterial
            color={experiences[i].color}
            metalness={0.6}
            roughness={0.3}
            emissive={i === activeIdx ? experiences[i].color : '#000'}
            emissiveIntensity={i === activeIdx ? 0.4 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef()

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (-rect.top) / (rect.height - window.innerHeight)))
      const idx = Math.min(experiences.length - 1, Math.floor(progress * experiences.length * 1.2))
      setActiveIdx(idx)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const exp = experiences[activeIdx]

  return (
    <section id="experience" ref={sectionRef} style={{ background: 'var(--off-white)', borderTop: '0.5px solid var(--border)', padding: '100px 0' }}>
      <div className="container">
        <p className="section-label">Experience</p>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 56 }}>
          Career timeline
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 48, alignItems: 'start' }}>
          {/* 3D timeline */}
          <div style={{ position: 'sticky', top: 100, height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--white)', border: '0.5px solid var(--border)' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[3, 5, 3]} intensity={1} />
              <TimelinePath activeIdx={activeIdx} />
            </Canvas>
            <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Career path · scroll to explore
            </div>
          </div>

          {/* Experience cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {experiences.map((e, i) => (
              <div key={i} onClick={() => setActiveIdx(i)} style={{
                background: 'var(--white)',
                border: `1px solid ${activeIdx === i ? e.color : 'var(--border)'}`,
                borderLeft: `4px solid ${e.color}`,
                borderRadius: 12, padding: '24px 28px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeIdx === i ? `0 4px 24px ${e.color}22` : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>{e.company}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2 }}>{e.role}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.period}</div>
                    <div style={{ fontSize: 11, marginTop: 3 }}>
                      <span style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 4, padding: '2px 7px', color: 'var(--text-secondary)', fontWeight: 500 }}>{e.node}</span>
                    </div>
                  </div>
                </div>

                {activeIdx === i && (
                  <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {e.highlights.map((h, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        <span style={{ color: e.color, flexShrink: 0, marginTop: 2 }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section#experience .container > div:last-child { grid-template-columns: 1fr !important; }
          section#experience .container > div:last-child > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
