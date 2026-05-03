import React from 'react'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Nav({ scrolled }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--nav-h)',
      background: scrolled ? 'rgba(8,12,20,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '0.5px solid var(--dark-border)' : 'none',
      transition: 'all 0.35s ease',
      display: 'flex', alignItems: 'center',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <a href="#" style={{
          fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 15,
          letterSpacing: '0.06em', color: 'var(--dark-text)',
        }}>
          fab<span style={{ color: 'var(--accent)' }}>_</span>
        </a>
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 400,
              letterSpacing: '0.08em', color: 'var(--dark-text-secondary)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--dark-text)'}
            onMouseLeave={e => e.target.style.color = 'var(--dark-text-secondary)'}
            >{l.toLowerCase()}</a>
          ))}
          <a href="/faisal-portfolio/resume.pdf" target="_blank" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 400, letterSpacing: '0.06em',
            padding: '7px 16px', background: 'transparent', color: 'var(--accent)',
            border: '0.5px solid var(--dark-border-bright)', borderRadius: 4, transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-dim)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--dark-border-bright)' }}
          >resume.pdf</a>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } }`}</style>
    </nav>
  )
}
