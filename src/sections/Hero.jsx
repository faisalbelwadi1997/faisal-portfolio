import React, { useEffect, useRef, useState } from 'react'
import ChipCanvas from '../components/ChipCanvas'

const nodes = ['28nm', '16nm', '7nm', '5nm', '3nm', '2nm']

function NodeCycler() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % nodes.length)
        setVisible(true)
      }, 300)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <span style={{
      display: 'inline-block',
      color: 'var(--accent)',
      fontWeight: 700,
      minWidth: 80,
      transition: 'opacity 0.3s, transform 0.3s',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-8px)',
    }}>{nodes[idx]}</span>
  )
}

export default function Hero() {
  const heroRef = useRef()

  return (
    <section id="hero" ref={heroRef} style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      paddingTop: 'var(--nav-h)',
      background: 'var(--white)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.35,
        pointerEvents: 'none',
      }} />

      {/* Left: text */}
      <div className="container" style={{ paddingRight: 0, paddingTop: 40, paddingBottom: 40 }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent-light)', border: '0.5px solid #b3cfff',
            borderRadius: 20, padding: '5px 14px', marginBottom: 28,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: 'var(--accent-dark)', fontWeight: 500 }}>Open to Senior / Staff roles</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 5vw, 62px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}>
            Faisal<br />Ahmed<br />Belwadi
          </h1>

          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14, maxWidth: 460 }}>
            Senior Physical Design & PD CAD Engineer — RTL to GDSII across <NodeCycler /> technology nodes.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 32, maxWidth: 440 }}>
            5.5+ years building end-to-end backend flows, ML-driven PPA optimization, and AI-powered EDA workflows at Microsoft and Cadence.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#projects" style={{
              background: 'var(--text-primary)', color: 'var(--white)',
              padding: '13px 28px', borderRadius: 8,
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >View Projects</a>

            <a href="https://linkedin.com/in/faisal-belwadi-physicaldesign-cad" target="_blank" style={{
              background: 'transparent', color: 'var(--text-primary)',
              padding: '13px 28px', borderRadius: 8,
              border: '1px solid var(--border-dark)',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-dark)'}
            >LinkedIn ↗</a>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 32, marginTop: 48, paddingTop: 32, borderTop: '0.5px solid var(--border)' }}>
            {[['5.5+', 'Years experience'], ['2nm–28nm', 'Tech nodes'], ['3+', 'Tapeouts owned']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{val}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: 3D Chip */}
      <div style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ChipCanvas style={{ width: '100%', height: '80vh' }} />
        <div style={{
          position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>Procedural IC die · Three.js</div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section#hero { grid-template-columns: 1fr !important; }
          section#hero > div:last-child { height: 50vh !important; }
        }
      `}</style>
    </section>
  )
}
