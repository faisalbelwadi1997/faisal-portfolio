import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const cases = [
  {
    id: 'cerebrus', title: 'Cerebrus ML-Driven PPA Optimization', company: 'Cadence Design Systems', node: '7nm',
    tag: 'ML / PPA', tagColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.12)', icon: '◈',
    problem: 'No established Cerebrus flow existed for Tensilica and Vision IPs. Manual PPA optimization was slow and inconsistent, blocking faster tapeout cycles.',
    approach: 'Built the Cerebrus ML flow end-to-end — environment, recipe configuration, cost function tuning, and scenario management across multiple IPs. Also built a scenario-replay flow cutting runtime 10× for similar designs.',
    impact: [{ metric: '14%', label: 'frequency gain' }, { metric: '10%', label: 'leakage reduction' }, { metric: '7%', label: 'active power savings' }, { metric: '10×', label: 'faster reruns' }],
    tools: ['Cerebrus', 'Innovus', 'Genus', 'Tempus', 'Python'],
  },
  {
    id: 'mixedplacer', title: 'Mixed-Placer Automation Flow', company: 'Cadence Design Systems', node: 'Multi-node',
    tag: 'Automation', tagColor: '#059669', tagBg: 'rgba(5,150,105,0.1)', icon: '⬡',
    problem: 'Placement was entirely manual — slow, error-prone, inconsistent across runs. No automation layer existed, making QoR unpredictable across engineers.',
    approach: 'Designed and implemented a Mixed-Placer flow replacing manual decisions with placement-aware optimization. Analyzes timing-critical paths and applies constraint-driven placement automatically in the standard PnR flow.',
    impact: [{ metric: '±3%', label: 'consistent PPA gain' }, { metric: '60%', label: 'faster PnR turnaround' }, { metric: '0', label: 'manual placement decisions' }, { metric: 'Multi', label: 'node compatible' }],
    tools: ['Innovus', 'Python', 'TCL', 'Perl', 'Shell'],
  },
  {
    id: 'genesys', title: 'Microsoft Genesys Regression Infra', company: 'Microsoft', node: '3nm / 2nm',
    tag: 'PD CAD / CI-CD', tagColor: '#0284c7', tagBg: 'rgba(2,132,199,0.1)', icon: '▸',
    problem: 'Regression was manual, slow, and fragile — tightly coupled infra caused frequent failures and made it impossible to scale coverage or catch bugs reliably before release.',
    approach: 'Led 4-member team to modernize the entire regression infra. Decoupled infra dependencies, built standalone validation environments, migrated to Git + Azure DevOps CI/CD, and enabled Hybrid FC + Innovus PNR flow integration.',
    impact: [{ metric: '2 wks', label: 'cycle time cut' }, { metric: '6×', label: 'testcase scale' }, { metric: '~15%', label: 'PPA improvement' }, { metric: '3', label: 'global regions' }],
    tools: ['Calibre', 'Innovus', 'Fusion Compiler', 'Azure DevOps', 'Git', 'Python'],
  },
  {
    id: 'fusa', title: 'FuSA Constrained Routing Methodology', company: 'Cadence Design Systems', node: '7nm',
    tag: 'ISO 26262 / Safety', tagColor: '#dc6803', tagBg: 'rgba(220,104,3,0.1)', icon: '◆',
    problem: 'No prior routing methodology existed for safety-critical blocks. Standard routing caused fault propagation across redundant logic, violating ISO 26262 ASIL requirements.',
    approach: 'Defined, implemented, and validated a complete FuSA constrained routing methodology — routing islands for physical isolation, triple-voting flop placement, and a signoff checklist ensuring ISO 26262 fault coverage.',
    impact: [{ metric: '100%', label: 'ISO 26262 compliance' }, { metric: '0', label: 'prior methodology' }, { metric: 'E2E', label: 'define → validate' }, { metric: 'First', label: 'FuSA flow for this IP' }],
    tools: ['Innovus', 'Tempus', 'Calibre', 'TCL', 'Python'],
  },
]

function FlipCard({ c, inView, delay }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`, perspective: 1000, height: 400 }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d', cursor: 'pointer',
        transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }} onClick={() => setFlipped(f => !f)}>
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: 'var(--white)', border: '0.5px solid var(--border)', borderRadius: 14, padding: '26px 24px',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <span style={{ fontSize: 24, color: c.tagColor }}>{c.icon}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 400, letterSpacing: '0.06em', padding: '3px 10px', borderRadius: 20, background: c.tagBg, color: c.tagColor }}>{c.tag}</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, lineHeight: 1.25, marginBottom: 8, color: 'var(--text-primary)' }}>{c.title}</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 14, letterSpacing: '0.04em' }}>{c.company} · {c.node}</p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>{c.problem}</p>
          <div style={{ marginTop: 18, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {c.tools.slice(0, 4).map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px', background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 4, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: c.tagColor, letterSpacing: '0.04em' }}>tap to see impact ↗</div>
        </div>
        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
          background: 'var(--dark-surface)', border: `0.5px solid ${c.tagColor}30`, borderRadius: 14, padding: '26px 24px',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.tagColor, letterSpacing: '0.1em', marginBottom: 16, opacity: 0.8 }}>// impact</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {c.impact.map(({ metric, label }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 10px', border: `0.5px solid ${c.tagColor}20` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--dark-text)' }}>{metric}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dark-text-muted)', marginTop: 3, letterSpacing: '0.04em' }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.tagColor, letterSpacing: '0.1em', marginBottom: 8, opacity: 0.8 }}>// approach</div>
          <p style={{ fontSize: 12, color: 'var(--dark-text-secondary)', lineHeight: 1.7, flex: 1 }}>{c.approach}</p>
          <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--dark-text-muted)', letterSpacing: '0.04em' }}>tap to flip back ↩</div>
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
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>Work that moved<br />the needle.</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', maxWidth: 260, lineHeight: 1.6, letterSpacing: '0.02em' }}>Tap any card to reveal impact, approach, and tools.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {cases.map((c, i) => <FlipCard key={c.id} c={c} inView={inView} delay={i * 0.1} />)}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { section#projects .container > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
