import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 0', background: 'var(--white)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container">
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>Contact</p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16,
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}>
            Let's build something<br />that matters.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 48, lineHeight: 1.7, opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.1s' }}>
            Open to Senior PD, Staff PD, PD CAD, and AI × EDA roles. Also happy to chat about automation, chip design workflows, or collaboration.
          </p>

          {/* Direct links */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
            {[
              { label: 'Email', href: 'mailto:faisal.belwadi1997@gmail.com', val: 'faisal.belwadi1997@gmail.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/faisal-belwadi-physicaldesign-cad', val: 'linkedin.com/in/faisal-belwadi' },
              { label: 'Phone', href: 'tel:+917020525785', val: '+91 70205 25785' },
            ].map(({ label, href, val }) => (
              <a key={label} href={href} target="_blank" rel="noopener" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: 'var(--off-white)', border: '0.5px solid var(--border)',
                borderRadius: 12, padding: '16px 24px', minWidth: 180,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</span>
                <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>{val}</span>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} style={{ textAlign: 'left', opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[['name', 'Name', 'text'], ['email', 'Email', 'email']].map(([field, label, type]) => (
                <div key={field}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>{label}</label>
                  <input type={type} required value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{
                      width: '100%', padding: '11px 14px', fontSize: 14,
                      border: '1px solid var(--border)', borderRadius: 8,
                      background: 'var(--off-white)', color: 'var(--text-primary)',
                      outline: 'none', transition: 'border-color 0.2s',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Message</label>
              <textarea required rows={4} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  width: '100%', padding: '11px 14px', fontSize: 14, resize: 'vertical',
                  border: '1px solid var(--border)', borderRadius: 8,
                  background: 'var(--off-white)', color: 'var(--text-primary)',
                  outline: 'none', transition: 'border-color 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <button type="submit" disabled={status === 'sending'} style={{
              width: '100%', padding: '13px', fontSize: 14, fontWeight: 500,
              background: status === 'sent' ? '#22c55e' : 'var(--text-primary)',
              color: 'var(--white)', border: 'none', borderRadius: 8,
              cursor: status === 'sending' ? 'wait' : 'pointer',
              fontFamily: 'var(--font-body)', transition: 'opacity 0.2s',
            }}>
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent ✓' : status === 'error' ? 'Error — try email directly' : 'Send message'}
            </button>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              Replace YOUR_FORM_ID in Contact.jsx with your Formspree ID to activate.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          section#contact form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
