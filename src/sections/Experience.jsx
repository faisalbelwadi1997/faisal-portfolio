import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    company: 'Microsoft',
    role: 'Silicon PD CAD Engineer 2',
    period: 'Oct 2024 – Present',
    location: 'Bengaluru, India',
    node: '3nm / 2nm',
    color: '#4a9eff',
    current: true,
    highlights: [
      'Leading 4-member regression team delivering zero-defect Genesys releases across India, US & APAC',
      'Reduced regression cycle time by 2 weeks by decoupling infra dependencies and building standalone validation environments',
      'Scaled regression infra 6× — from 4 to 25 testcases with Azure DevOps CI/CD pipelines',
      'Enabled Hybrid FC + Innovus PNR flow integration delivering ~15% improvement across all PPA metrics',
      'Enhanced Physical Verification flows using Calibre — added multiple features in v2lvs and netlist generation',
    ],
  },
  {
    company: 'Cadence Design Systems',
    role: 'Lead Physical Design Engineer',
    period: 'Apr 2024 – Sep 2024',
    location: 'Pune, India',
    node: '7nm',
    color: '#c9a84c',
    highlights: [
      'Owned full RTL-to-GDSII implementation for high-frequency Vision processor cores (3M+ instances, multiple clocks)',
      'Built Cerebrus ML-based PPA optimization — 14% frequency gain, 10% leakage reduction, 7% active power savings',
      'Developed FuSA constrained routing methodology for ISO 26262 multicore designs',
      'Built scenario-replay flow reducing Cerebrus runtime by 10× for similar configurations',
      'Developed automated floorplan resizing utility maximising utilisation without manual tuning',
    ],
  },
  {
    company: 'Cadence Design Systems',
    role: 'Physical Design Engineer II',
    period: 'Aug 2020 – Mar 2024',
    location: 'Pune, India',
    node: '7nm – 28nm',
    color: '#7c3aed',
    highlights: [
      'Implemented Mixed-Placer flow replacing manual placement — ±3% PPA gain, 60% faster PnR turnaround',
      'Delivered complete backend closure (CTS, PnR, STA, ECO, IR-Drop) for multiple Tensilica IPs',
      'Reduced backend turnaround from weeks to 1 week via ETM bottom-up flow (2.5M+ instances)',
      'Eliminated ~20ps hold slack on slow data paths via targeted floorplan techniques',
    ],
  },
  {
    company: 'Cadence Design Systems',
    role: 'Physical Design Intern',
    period: 'Jul 2019 – Jul 2020',
    location: 'Pune, India',
    node: '16nm / 28nm',
    color: '#4a9eff',
    highlights: [
      'Built Physical Verification flows using PVS/Pegasus for 28nm and 16nm (DRC/LVS)',
      'Built LSF-based distributed execution within EDA tools — increased farm throughput and slot availability',
    ],
  },
]

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: '0 32px',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(28px)',
      transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
    }}>
      {/* Left: timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
        {/* Node dot */}
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: exp.current ? exp.color : 'var(--dark-surface-2)',
          border: `2px solid ${exp.color}`,
          boxShadow: exp.current ? `0 0 12px ${exp.color}60` : 'none',
          flexShrink: 0, zIndex: 1,
          transition: 'box-shadow 0.3s',
        }} />
        {/* Line down */}
        {index < experiences.length - 1 && (
          <div style={{
            width: 1, flex: 1, minHeight: 40, marginTop: 8,
            background: `linear-gradient(to bottom, ${exp.color}40, transparent)`,
          }} />
        )}
      </div>

      {/* Right: card */}
      <div style={{ paddingBottom: 36 }}>
        <div style={{
          background: 'var(--dark-surface)',
          border: `0.5px solid ${expanded ? exp.color + '40' : 'var(--dark-border)'}`,
          borderLeft: `2px solid ${exp.color}`,
          borderRadius: 10,
          padding: '20px 24px',
          cursor: 'pointer',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          boxShadow: expanded ? `0 4px 32px ${exp.color}14` : 'none',
        }}
        onClick={() => setExpanded(e => !e)}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.borderColor = `${exp.color}30` }}
        onMouseLeave={e => { if (!expanded) e.currentTarget.style.borderColor = 'var(--dark-border)' }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--dark-text)', marginBottom: 3 }}>
                {exp.company}
                {exp.current && (
                  <span style={{ marginLeft: 10, fontFamily: 'var(--font-mono)', fontSize: 9, padding: '2px 8px', borderRadius: 20, background: '#22c55e20', color: '#22c55e', border: '0.5px solid #22c55e40', letterSpacing: '0.06em' }}>current</span>
                )}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--dark-text-secondary)', marginBottom: 8 }}>{exp.role}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--dark-text-muted)', letterSpacing: '0.04em' }}>{exp.period}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: exp.color, letterSpacing: '0.04em', opacity: 0.8 }}>{exp.node}</span>
              </div>
            </div>
            <div style={{
              color: 'var(--dark-text-muted)', fontSize: 16, flexShrink: 0,
              transition: 'transform 0.3s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>▾</div>
          </div>

          {/* Expanded highlights */}
          {expanded && (
            <ul style={{ marginTop: 18, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, borderTop: `0.5px solid ${exp.color}20`, paddingTop: 16 }}>
              {exp.highlights.map((h, j) => (
                <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--dark-text-secondary)', lineHeight: 1.6 }}>
                  <span style={{ color: exp.color, flexShrink: 0, marginTop: 1, fontFamily: 'var(--font-mono)', fontSize: 11 }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="experience" ref={ref} style={{ padding: '100px 0', background: 'var(--dark-bg)', borderTop: '0.5px solid var(--dark-border)' }}>
      <div className="container">
        <p className="section-label-dark">Experience</p>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 56, color: 'var(--dark-text)', lineHeight: 1.1 }}>
          Career timeline
        </h2>

        <div style={{ maxWidth: 760 }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
