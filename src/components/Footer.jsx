import React from 'react'
export default function Footer() {
  return (
    <footer style={{ padding: '28px 0', borderTop: '0.5px solid var(--dark-border)', background: 'var(--dark-bg)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 14, color: 'var(--dark-text)' }}>
          fab<span style={{ color: 'var(--accent)' }}>_</span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--dark-text-muted)', letterSpacing: '0.06em' }}>
          faisal ahmed belwadi · bengaluru · react + three.js
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['linkedin', 'https://linkedin.com/in/faisal-belwadi-physicaldesign-cad'], ['email', 'mailto:faisal.belwadi1997@gmail.com']].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--dark-text-muted)', letterSpacing: '0.06em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--dark-text-muted)'}
            >{label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
