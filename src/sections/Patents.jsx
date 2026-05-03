import React from 'react'
import { useInView } from 'react-intersection-observer'

const items = [
  {
    type: 'Patent',
    title: 'Remote Automated Health Care Assistant',
    details: 'Indian Patent · Application No. 201821036329A · Filed 2018',
    desc: 'An automated remote healthcare assistant system for patient monitoring and diagnostics.',
    color: '#7c3aed', bg: '#ede9fe',
  },
  {
    type: 'IEEE Publication',
    title: 'Text Detection and Communicator Using Braille for Assistance to Visually Impaired',
    details: 'IEEE PuneCon 2020',
    desc: 'A system leveraging OCR and Braille conversion to improve communication accessibility for visually impaired individuals.',
    color: '#065f46', bg: '#d1fae5',
  },
  {
    type: 'Education',
    title: 'M.Tech in Microelectronics — BITS Pilani',
    details: 'GPA: 8.79 / 10',
    desc: 'Postgraduate specialization in microelectronics, VLSI design, and semiconductor devices.',
    color: '#0369a1', bg: '#e0f2fe',
  },
  {
    type: 'Education',
    title: 'B.Tech in Electronics & Telecommunication — VIT, Pune',
    details: 'Gold Medalist · 1st Rank · GPA: 9.77 / 10',
    desc: 'Graduated top of class with a gold medal in Electronics and Telecommunication Engineering.',
    color: '#c9a84c', bg: '#fef3c7',
  },
]

export default function Patents() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="patents" ref={ref} style={{ padding: '100px 0', background: 'var(--off-white)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container">
        <p className="section-label">Research & Education</p>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 48, lineHeight: 1.1 }}>
          Patents, publications<br />& academic excellence.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: 'var(--white)', border: '0.5px solid var(--border)',
              borderRadius: 14, padding: '26px 24px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}>
              <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20, background: item.bg, color: item.color, marginBottom: 14, display: 'inline-block' }}>{item.type}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 6, color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ fontSize: 12, color: item.color, fontWeight: 500, marginBottom: 10 }}>{item.details}</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#patents .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
