import React from 'react'
import { useInView } from 'react-intersection-observer'

const highlights = [
  { icon: '⬡', label: 'Physical Design', desc: 'Full RTL-to-GDSII ownership across 5nm, 7nm, 16nm, 28nm — and current 3nm/2nm PD CAD at Microsoft.' },
  { icon: '⬡', label: 'AI & Automation', desc: 'Building AI-powered EDA workflows, MCP integrations, and scalable infra that removes human bottlenecks from chip design loops.' },
  { icon: '⬡', label: 'PD CAD Methodology', desc: 'Cerebrus ML flows, Mixed-Placer automation, ETM bottom-up flows — I build the systems other engineers run.' },
  { icon: '⬡', label: 'Safety-Critical Design', desc: 'ISO 26262 FuSA methodology for multicore SoCs — constrained routing, triple-voting flops, routing islands.' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" ref={ref} style={{ padding: '100px 0', background: 'var(--off-white)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container">
        <p className="section-label">About</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.6s ease' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 24, lineHeight: 1.1 }}>
              I build the infra<br />that ships chips faster.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16 }}>
              I'm a Senior Physical Design and PD CAD Engineer with 5.5+ years specialising in advanced node backend flows — currently at Microsoft working on 3nm and 2nm PD CAD for the Genesys platform, collaborating with teams across India, the US, and APAC.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16 }}>
              At Cadence, I owned full RTL-to-GDSII implementation for Tensilica and Vision processor IPs, built Cerebrus ML flows from scratch, and developed automation systems that cut multi-week turnarounds to days.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              Beyond PD, I'm an AI workflow specialist — integrating LLMs, MCP servers, and agentic systems into EDA pipelines to make chip design faster, smarter, and more scalable.
            </p>

            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <a href="mailto:faisal.belwadi1997@gmail.com" style={{
                fontSize: 13, fontWeight: 500, color: 'var(--accent)',
                padding: '8px 0', borderBottom: '1px solid var(--accent)',
              }}>faisal.belwadi1997@gmail.com</a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.6s ease 0.15s' }}>
            {highlights.map(({ icon, label, desc }) => (
              <div key={label} style={{
                background: 'var(--white)', border: '0.5px solid var(--border)',
                borderRadius: 12, padding: '20px 18px',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,86,219,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ fontSize: 20, marginBottom: 10, color: 'var(--accent)' }}>◈</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#about .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
