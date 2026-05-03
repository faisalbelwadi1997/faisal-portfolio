import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) } else setStatus('error')
    } catch { setStatus('error') }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', fontSize: 13,
    border: '0.5px solid var(--dark-border)', borderRadius: 6,
    background: 'var(--dark-surface-2)', color: 'var(--dark-text)',
    outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 0', background: 'var(--dark-bg)', borderTop: '0.5px solid var(--dark-border)' }}>
      <div className="container">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label-dark" style={{ textAlign: 'center' }}>Contact</p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.035em',
            lineHeight: 1.05, marginBottom: 16, color: 'var(--dark-text)',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease',
          }}>Let's build something<br />that matters.</h2>
          <p style={{ fontSize: 14, color: 'var(--dark-text-secondary)', marginBottom: 48, lineHeight: 1.75, opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.1s' }}>
            Open to Senior PD, Staff PD, PD CAD, and AI × EDA roles. Happy to chat about automation, chip design workflows, or collaboration.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
            {[
              { label: 'email', href: 'mailto:faisal.belwadi1997@gmail.com', val: 'faisal.belwadi1997@gmail.com' },
              { label: 'linkedin', href: 'https://linkedin.com/in/faisal-belwadi-physicaldesign-cad', val: 'faisal-belwadi' },
              { label: 'phone', href: 'tel:+917020525785', val: '+91 70205 25785' },
            ].map(({ label, href, val }) => (
              <a key={label} href={href} target="_blank" rel="noopener" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: 'var(--dark-surface)', border: '0.5px solid var(--dark-border)',
                borderRadius: 10, padding: '14px 22px', minWidth: 170, transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--dark-border)'}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dark-text-muted)', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>{val}</span>
              </a>
            ))}
          </div>
          <form onSubmit={handleSubmit} style={{ textAlign: 'left', opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[['name','Name','text'],['email','Email','email']].map(([field, label, type]) => (
                <div key={field}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dark-text-muted)', display: 'block', marginBottom: 6, letterSpacing: '0.08em' }}>{label.toLowerCase()}</label>
                  <input type={type} required value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--dark-border)'} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dark-text-muted)', display: 'block', marginBottom: 6, letterSpacing: '0.08em' }}>message</label>
              <textarea required rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--dark-border)'} />
            </div>
            <button type="submit" disabled={status === 'sending'} style={{
              width: '100%', padding: '12px', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
              background: status === 'sent' ? '#22c55e' : 'var(--accent)',
              color: '#fff', border: 'none', borderRadius: 6, cursor: status === 'sending' ? 'wait' : 'pointer',
              fontFamily: 'var(--font-mono)', transition: 'opacity 0.2s',
            }}>
              {status === 'sending' ? 'sending...' : status === 'sent' ? 'message_sent ✓' : status === 'error' ? 'error — try email directly' : 'send_message →'}
            </button>
          </form>
        </div>
      </div>
      <style>{`@media (max-width: 600px) { section#contact form > div:first-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
