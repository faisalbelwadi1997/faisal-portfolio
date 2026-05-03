import React from 'react'
import { useInView } from 'react-intersection-observer'

const nodes = ['2nm','3nm','5nm','7nm','16nm','28nm']
const tools = [
  { name: 'Innovus', cat: 'PnR' }, { name: 'Genus', cat: 'Synthesis' },
  { name: 'Tempus', cat: 'STA' }, { name: 'Voltus', cat: 'IR/EM' },
  { name: 'Cerebrus', cat: 'ML PPA' }, { name: 'Fusion Compiler', cat: 'PnR' },
  { name: 'PrimeTime', cat: 'STA' }, { name: 'Calibre', cat: 'PV' },
  { name: 'Pegasus+', cat: 'PV' }, { name: 'PVS', cat: 'PV' },
]
const skills = [
  { group: 'Physical Design', color: '#4a9eff', items: ['RTL-to-GDSII','Floorplanning','Power Planning','CTS','Place & Route','STA Signoff','ECO','IR-Drop Closure','Physical Verification'] },
  { group: 'PD CAD & Methodology', color: '#c9a84c', items: ['Cerebrus ML Flow','Mixed-Placer','ETM Bottom-Up','Regression Infra','QoR Benchmarking','FuSA Routing','CI/CD for EDA','ISO 26262'] },
  { group: 'AI & Automation', color: '#7c3aed', items: ['AI Workflow Design','MCP Integration','LLM-in-the-loop','Scalable Infra','Python','TCL','Perl','Shell','Git / Perforce','Azure DevOps'] },
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="skills" ref={ref} style={{ padding: '100px 0', background: 'var(--off-white)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container">
        <p className="section-label">Skills & Expertise</p>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 56, lineHeight: 1.1, color: 'var(--text-primary)' }}>
          Built for advanced nodes.<br />Wired for automation.
        </h2>

        {/* Tech node timeline */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 18 }}>// technology nodes</p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
            {nodes.map((n, i) => {
              const isCurrent = n === '2nm' || n === '3nm'
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(10px)',
                    transition: `all 0.4s ease ${i * 0.07}s`, textAlign: 'center',
                  }}>
                    <div style={{
                      padding: '9px 18px', borderRadius: 6,
                      background: isCurrent ? 'var(--accent-dark)' : 'var(--white)',
                      border: `1px solid ${isCurrent ? 'var(--accent-dark)' : 'var(--border)'}`,
                      color: isCurrent ? '#fff' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 15,
                      letterSpacing: '0.02em', position: 'relative',
                    }}>
                      {n}
                      {isCurrent && <span style={{ position: 'absolute', top: -5, right: -5, width: 8, height: 8, borderRadius: '50%', background: '#22c55e', border: '2px solid var(--off-white)', boxShadow: '0 0 6px #22c55e' }} />}
                    </div>
                  </div>
                  {i < nodes.length - 1 && <div style={{ width: 20, height: 1, background: 'var(--border-dark)', margin: '0 2px' }} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* EDA Tools */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 14 }}>// eda tools</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tools.map((t, i) => (
              <div key={t.name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--white)', border: '0.5px solid var(--border)', borderRadius: 6, padding: '7px 13px',
                opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)',
                transition: `all 0.4s ease ${i * 0.04}s`,
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{t.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', background: 'var(--surface)', borderRadius: 3, padding: '1px 6px', letterSpacing: '0.04em' }}>{t.cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill groups */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {skills.map(({ group, color, items }, gi) => (
            <div key={group} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `all 0.5s ease ${gi * 0.1 + 0.2}s` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color, marginBottom: 14, letterSpacing: '0.08em' }}>// {group.toLowerCase()}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {items.map(item => (
                  <span key={item} style={{ fontSize: 12, padding: '4px 10px', background: 'var(--white)', border: '0.5px solid var(--border)', borderRadius: 4, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { section#skills .container > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
