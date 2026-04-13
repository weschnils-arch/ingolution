import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const els = section.querySelectorAll('.contact-reveal')
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      )
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Anfrage über ingolution.at')
    const body = encodeURIComponent(`Hallo Ingolution,\n\nMein Name ist ${name}.\n\nIch interessiere mich für Ihre Backup-Lösungen und würde gerne mehr erfahren.\n\nMit freundlichen Grüßen,\n${name}\n${email}`)
    window.location.href = `mailto:office@ingolution.at?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 bg-[var(--color-surface-2)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 contact-reveal">
          <span className="inline-block text-[var(--color-green)] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Kontakt
          </span>
          <h2
            className="font-display font-700 text-[var(--color-text)] tracking-tight mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
          >
            Lassen Sie uns
            <span className="text-[var(--color-green)]"> sprechen.</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto leading-relaxed">
            Schreiben Sie uns und erfahren Sie, wie Ingolution Ihre Daten schützen kann.
          </p>
        </div>

        <div className="contact-reveal max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ihr Name"
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]/30 focus:border-[var(--color-green)] transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                E-Mail
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ihre@email.at"
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]/30 focus:border-[var(--color-green)] transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full px-8 py-4 rounded-full bg-[var(--color-green)] text-white font-semibold text-base hover:bg-[var(--color-green-light)] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--color-green)]/20"
            >
              Nachricht senden
            </button>
          </form>

          <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
            Ihre Daten werden nicht gespeichert. Die Nachricht wird direkt per E-Mail versendet.
          </p>
        </div>
      </div>
    </section>
  )
}
