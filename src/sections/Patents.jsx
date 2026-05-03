import React from 'react'
import { useInView } from 'react-intersection-observer'

const items = [
  { type: 'Patent', title: 'Remote Automated Health Care Assistant', details: 'Indian Patent · App No. 201821036329A · Filed 2018', desc: 'Automated remote healthcare assistant system for patient monitoring and diagnostics.', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { type: 'IEEE Publication', title: 'Text Detection and Communicator Using Braille for Assistance to Visually Impaired', details: 'IEEE PuneCon 2020', desc: 'OCR and Braille conversion system improving communication accessibility for visually impaired individuals.', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  { type: 'M.Tech', title: 'Microelectronics — BITS Pilani', details: 'GPA: 8.79 / 10', desc: 'Postgraduate specialization in microelectronics, VLSI design, and semiconductor devices.', color: '#0284c7', bg: 'rgba(2,132,199,0.08)' },
  { type: 'B.Tech', title: 'Electronics & Telecommunication — VIT, Pune', details: 'Gold Medalist · 1st Rank · GPA: 9.77 / 10', desc: 'Graduated top of class with a gold medal in Electronics and Telecommunication Engineering.', color: '#c9a84c', bg: 'rgba(201,168,76,0.1)' },
]

export default function Patents() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="patents" ref={ref} style={{ padding: '100px 0', background: 'var(--off-white)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container">
        <p className="section-label">Research & Education</p>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 48, lineHeight: 1.1, color: 'var(--text-primary)' }}>Patents, publications<br />& academic record.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: 'var(--white)', border: '0.5px solid var(--border)', borderLeft: `3px solid ${item.color}`,
              borderRadius: 12, padding: '24px 22px',
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 400, letterSpacing: '0.08em', padding: '2px 9px', borderRadius: 4, background: item.bg, color: item.color, marginBottom: 12, display: 'inline-block' }}>{item.type}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, lineHeight: 1.35, marginBottom: 6, color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: item.color, fontWeight: 400, marginBottom: 10, letterSpacing: '0.04em' }}>{item.details}</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { section#patents .container > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
