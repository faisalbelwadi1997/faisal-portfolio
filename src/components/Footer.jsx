import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      padding: '32px 0',
      borderTop: '0.5px solid var(--border)',
      background: 'var(--off-white)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>
          FAB<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Faisal Ahmed Belwadi · Bengaluru, India · Built with React + Three.js
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            ['LinkedIn', 'https://linkedin.com/in/faisal-belwadi-physicaldesign-cad'],
            ['Email', 'mailto:faisal.belwadi1997@gmail.com'],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener" style={{ fontSize: 12, color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >{label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
