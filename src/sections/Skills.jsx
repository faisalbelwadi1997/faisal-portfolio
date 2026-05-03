import React from 'react'
import { useInView } from 'react-intersection-observer'

const nodes = [
  { label: '2nm', status: 'current', note: 'Microsoft PD CAD' },
  { label: '3nm', status: 'current', note: 'Microsoft PD CAD' },
  { label: '5nm', status: 'done', note: 'Cadence IP' },
  { label: '7nm', status: 'done', note: 'Cadence Vision Core' },
  { label: '16nm', status: 'done', note: 'Cadence Tensilica' },
  { label: '28nm', status: 'done', note: 'PV flows, DRC/LVS' },
]

const tools = [
  { name: 'Innovus', cat: 'PnR' }, { name: 'Genus', cat: 'Synthesis' },
  { name: 'Tempus', cat: 'STA' }, { name: 'Voltus', cat: 'IR/EM' },
  { name: 'Cerebrus', cat: 'ML PPA' }, { name: 'Fusion Compiler', cat: 'PnR' },
  { name: 'PrimeTime', cat: 'STA' }, { name: 'Calibre', cat: 'PV' },
  { name: 'Pegasus+', cat: 'PV' }, { name: 'PVS', cat: 'PV' },
]

const skills = [
  { group: 'Physical Design', items: ['RTL-to-GDSII', 'Floorplanning', 'Power Planning', 'CTS', 'Place & Route', 'STA Signoff', 'ECO', 'IR-Drop Closure', 'Physical Verification'] },
  { group: 'PD CAD & Methodology', items: ['Cerebrus ML Flow', 'Mixed-Placer', 'ETM Bottom-Up', 'Regression Infra', 'QoR Benchmarking', 'FuSA Routing', 'CI/CD for EDA', 'ISO 26262'] },
  { group: 'AI & Automation', items: ['AI Workflow Design', 'MCP Integration', 'LLM-in-the-loop', 'Scalable Infra', 'Python', 'TCL', 'Perl', 'Shell', 'Git / Perforce', 'Azure DevOps'] },
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" ref={ref} style={{ padding: '100px 0', background: 'var(--white)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container">
        <p className="section-label">Skills & Expertise</p>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 56, lineHeight: 1.1 }}>
          Built for advanced nodes.<br />Wired for automation.
        </h2>

        {/* Tech node timeline */}
        <div style={{ marginBottom: 60 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Technology node experience</p>
          <div style={{ display: 'flex', gap: 0, alignItems: 'center', flexWrap: 'wrap' }}>
            {nodes.map((n, i) => (
              <div key={n.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(12px)',
                  transition: `all 0.5s ease ${i * 0.08}s`,
                  textAlign: 'center',
                  cursor: 'default',
                }}>
                  <div style={{
                    padding: '10px 20px', borderRadius: 8,
                    background: n.status === 'current' ? 'var(--text-primary)' : 'var(--surface)',
                    border: `1px solid ${n.status === 'current' ? 'var(--text-primary)' : 'var(--border)'}`,
                    color: n.status === 'current' ? 'var(--white)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700, fontSize: 16,
                    position: 'relative',
                  }}>
                    {n.label}
                    {n.status === 'current' && (
                      <span style={{ position: 'absolute', top: -6, right: -6, width: 10, height: 10, borderRadius: '50%', background: '#22c55e', border: '2px solid white' }} />
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, maxWidth: 80 }}>{n.note}</div>
                </div>
                {i < nodes.length - 1 && (
                  <div style={{ width: 24, height: 1, background: 'var(--border-dark)', margin: '0 4px', marginBottom: 20 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EDA Tools */}
        <div style={{ marginBottom: 60 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>EDA tools</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tools.map((t, i) => (
              <div key={t.name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--off-white)', border: '0.5px solid var(--border)',
                borderRadius: 8, padding: '8px 14px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(8px)',
                transition: `all 0.4s ease ${i * 0.05}s`,
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{t.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--border)', borderRadius: 4, padding: '1px 6px' }}>{t.cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill groups */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {skills.map(({ group, items }, gi) => (
            <div key={group} style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 0.5s ease ${gi * 0.1 + 0.2}s`,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {items.map(item => (
                  <span key={item} style={{
                    fontSize: 12, padding: '4px 10px',
                    background: 'var(--off-white)', border: '0.5px solid var(--border)',
                    borderRadius: 20, color: 'var(--text-secondary)',
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#skills .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
