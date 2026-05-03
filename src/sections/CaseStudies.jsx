import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const cases = [
  {
    id: 'cerebrus',
    title: 'Cerebrus ML-Driven PPA Optimization',
    company: 'Cadence Design Systems',
    node: '7nm',
    tag: 'ML / PPA',
    tagColor: '#7c3aed',
    tagBg: '#ede9fe',
    icon: '◈',
    problem: 'Tensilica and Vision processor IPs had no established Cerebrus flow. Manual PPA optimization was slow, inconsistent, and unable to explore the full design space — blocking faster tapeout cycles.',
    approach: 'I built the Cerebrus ML flow infrastructure end-to-end: environment setup, recipe configuration, cost function tuning, and scenario management across multiple IPs. Also developed a scenario-replay flow that reuses learned configurations, cutting runtime 10× for similar designs.',
    impact: [
      { metric: '14%', label: 'frequency gain' },
      { metric: '10%', label: 'leakage reduction' },
      { metric: '7%', label: 'active power savings' },
      { metric: '10×', label: 'faster Cerebrus reruns' },
    ],
    tools: ['Cerebrus', 'Innovus', 'Genus', 'Tempus', 'Python', 'TCL'],
  },
  {
    id: 'mixedplacer',
    title: 'Mixed-Placer Automation Flow',
    company: 'Cadence Design Systems',
    node: 'Multi-node',
    tag: 'Automation',
    tagColor: '#065f46',
    tagBg: '#d1fae5',
    icon: '⬡',
    problem: 'Placement decisions were entirely manual — slow, error-prone, and inconsistent across runs. PPA varied between engineers and there was no automation layer, making QoR unpredictable.',
    approach: 'Designed and implemented a Mixed-Placer flow that replaced manual placement decisions with a placement-aware optimization engine. The system analyzes timing-critical paths and applies constraint-driven placement automatically, integrating directly into the standard PnR flow.',
    impact: [
      { metric: '±3%', label: 'consistent PPA gain' },
      { metric: '60%', label: 'faster PnR turnaround' },
      { metric: '0', label: 'manual placement decisions' },
      { metric: 'Multi', label: 'node compatible' },
    ],
    tools: ['Innovus', 'Python', 'TCL', 'Perl', 'Shell'],
  },
  {
    id: 'genesys',
    title: 'Microsoft Genesys Regression Infra',
    company: 'Microsoft',
    node: '3nm / 2nm',
    tag: 'PD CAD / CI-CD',
    tagColor: '#0369a1',
    tagBg: '#e0f2fe',
    icon: '▸',
    problem: 'The Genesys regression system was manual, slow, and fragile — tightly coupled to infra dependencies that caused frequent failures and made it impossible to scale coverage or catch bugs reliably before release.',
    approach: 'Led a 4-member team to modernize the entire regression infrastructure. Decoupled infra dependencies by building standalone validation environments, migrated to Git-based workflows with Azure DevOps CI/CD pipelines, and enabled a Hybrid FC + Innovus PNR flow integration. Also enhanced Calibre-based Physical Verification flows.',
    impact: [
      { metric: '2 wks', label: 'cycle time reduction' },
      { metric: '6×', label: 'testcase scale (4 → 25)' },
      { metric: '~15%', label: 'PPA improvement via hybrid flow' },
      { metric: '3', label: 'global regions served' },
    ],
    tools: ['Calibre', 'Innovus', 'Fusion Compiler', 'Azure DevOps', 'Git', 'Python'],
  },
  {
    id: 'fusa',
    title: 'FuSA Constrained Routing Methodology',
    company: 'Cadence Design Systems',
    node: '7nm',
    tag: 'ISO 26262 / Safety',
    tagColor: '#9a3412',
    tagBg: '#ffedd5',
    icon: '◆',
    problem: 'No prior routing methodology existed for safety-critical blocks in a consumer SoC with functional safety requirements. Standard routing would cause fault propagation across redundant logic — violating ISO 26262 ASIL requirements.',
    approach: 'Defined, implemented, and validated a complete FuSA constrained routing methodology from scratch. Used routing islands to physically isolate redundant logic, implemented triple-voting flop placement strategies, and created a signoff checklist ensuring compliance. Validated against ISO 26262 fault coverage requirements.',
    impact: [
      { metric: '100%', label: 'ISO 26262 compliance achieved' },
      { metric: '0', label: 'prior methodology existed' },
      { metric: 'End-to-end', label: 'ownership: define → validate' },
      { metric: 'First', label: 'FuSA flow at Cadence for this IP' },
    ],
    tools: ['Innovus', 'Tempus', 'Calibre', 'TCL', 'Python'],
  },
]

function FlipCard({ c, inView, delay }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(30px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      perspective: 1000,
      height: 420,
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
      }} onClick={() => setFlipped(f => !f)}>

        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: 'var(--white)', border: '0.5px solid var(--border)',
          borderRadius: 16, padding: '28px 26px',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <span style={{ fontSize: 26, color: c.tagColor }}>{c.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 20, background: c.tagBg, color: c.tagColor }}>{c.tag}</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, lineHeight: 1.25, marginBottom: 12, color: 'var(--text-primary)' }}>{c.title}</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{c.company} · {c.node}</p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>{c.problem}</p>

          <div style={{ marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {c.tools.slice(0, 4).map(t => (
              <span key={t} style={{ fontSize: 11, padding: '3px 9px', background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 4, color: 'var(--text-muted)' }}>{t}</span>
            ))}
          </div>

          <div style={{ marginTop: 16, fontSize: 12, color: c.tagColor, display: 'flex', alignItems: 'center', gap: 4 }}>
            Tap to see impact ↗
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'var(--text-primary)', borderRadius: 16, padding: '28px 26px',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Impact</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {c.impact.map(({ metric, label }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '14px 12px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--white)' }}>{metric}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Approach</div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, flex: 1 }}>{c.approach}</p>

          <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Tap to flip back ↩
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="projects" ref={ref} style={{ padding: '100px 0', background: 'var(--white)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container">
        <p className="section-label">Case Studies</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Work that moved<br />the needle.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 280, lineHeight: 1.6 }}>Tap any card to see the full impact, approach, and tools used.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} ref={ref}>
          {cases.map((c, i) => (
            <FlipCard key={c.id} c={c} inView={inView} delay={i * 0.1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#projects .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
