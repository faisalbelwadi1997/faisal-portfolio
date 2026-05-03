import React, { useEffect, useState } from 'react'
import ChipCanvas from '../components/ChipCanvas'

const nodes = ['28nm', '16nm', '7nm', '5nm', '3nm', '2nm']

function NodeCycler() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % nodes.length); setVisible(true) }, 280)
    }, 1800)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{
      display: 'inline-block', color: 'var(--accent)', fontFamily: 'var(--font-mono)',
      fontWeight: 500, minWidth: 72, letterSpacing: '0.04em',
      transition: 'opacity 0.28s, transform 0.28s',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-6px)',
    }}>{nodes[idx]}</span>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      paddingTop: 'var(--nav-h)',
      background: 'var(--dark-bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(74,158,255,0.12) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      {/* Gradient fade bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
        background: 'linear-gradient(to bottom, transparent, var(--dark-bg))',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Left: text */}
      <div className="container" style={{ paddingRight: 0, paddingTop: 60, paddingBottom: 60, position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: 540 }}>
          {/* Status pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(74,158,255,0.08)',
            border: '0.5px solid var(--dark-border-bright)',
            borderRadius: 20, padding: '5px 14px', marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--dark-text-secondary)', letterSpacing: '0.06em' }}>open to senior / staff roles</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(42px, 5.5vw, 70px)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            color: 'var(--dark-text)',
            marginBottom: 28,
          }}>
            Faisal<br />
            <span style={{ color: 'var(--accent)', opacity: 0.9 }}>Ahmed</span><br />
            Belwadi
          </h1>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--dark-text-secondary)', lineHeight: 1.7, marginBottom: 10, maxWidth: 420, letterSpacing: '0.02em' }}>
            Senior PD & PD CAD Engineer · RTL to GDSII across <NodeCycler />
          </p>
          <p style={{ fontSize: 14, color: 'var(--dark-text-muted)', lineHeight: 1.7, marginBottom: 36, maxWidth: 430 }}>
            5.5+ years building end-to-end backend flows, ML-driven PPA optimization, and AI-powered EDA workflows at Microsoft and Cadence.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#projects" style={{
              background: 'var(--accent)', color: '#fff',
              padding: '12px 26px', borderRadius: 6,
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >view_projects →</a>

            <a href="https://linkedin.com/in/faisal-belwadi-physicaldesign-cad" target="_blank" style={{
              background: 'transparent', color: 'var(--dark-text)',
              padding: '12px 26px', borderRadius: 6,
              border: '0.5px solid var(--dark-border)',
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--dark-border)'}
            >linkedin ↗</a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, marginTop: 52, paddingTop: 32, borderTop: '0.5px solid var(--dark-border)' }}>
            {[['5.5+', 'yrs experience'], ['2nm→28nm', 'nodes'], ['3+', 'tapeouts']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--dark-text)', letterSpacing: '-0.02em' }}>{val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dark-text-muted)', marginTop: 3, letterSpacing: '0.08em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: 3D chip */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 3 }}>
        <ChipCanvas style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dark-text-muted)',
          letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>isometric ic die · three.js procedural</div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section#hero { grid-template-columns: 1fr !important; }
          section#hero > div:last-child { height: 55vh !important; }
        }
      `}</style>
    </section>
  )
}
