import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* SF Symbol-style SVG icons */
const LockShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3.5 6.5V11c0 5.25 3.625 10.15 8.5 11.5 4.875-1.35 8.5-6.25 8.5-11.5V6.5L12 2z" />
    <rect x="9" y="10" width="6" height="5" rx="1" />
    <path d="M10 10V8a2 2 0 0 1 4 0v2" />
  </svg>
)

const ServerCrashIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="7" rx="2" />
    <circle cx="6" cy="6.5" r="1" fill="currentColor" />
    <line x1="10" y1="6.5" x2="18" y2="6.5" />
    <rect x="2" y="14" width="20" height="7" rx="2" />
    <circle cx="6" cy="17.5" r="1" fill="currentColor" />
    <line x1="10" y1="17.5" x2="18" y2="17.5" />
    <path d="M21 2l-3 3m0-3l3 3" strokeWidth="2" />
  </svg>
)

const PersonWarningIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="7" r="3.5" />
    <path d="M3 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
    <path d="M20 6v3" />
    <circle cx="20" cy="11" r="0.5" fill="currentColor" />
  </svg>
)

const scenarios = [
  {
    icon: <LockShieldIcon />,
    title: 'Ransomware-Angriff',
    description:
      'Ihre gesamten Unternehmensdaten werden verschluesselt. Kein Zugriff, kein Backup, keine Verhandlung -- nur Stillstand.',
    stat: '71%',
    statLabel: 'aller KMU erholen sich nie vollstaendig',
  },
  {
    icon: <ServerCrashIcon />,
    title: 'Hardware-Crash',
    description:
      'Festplatten sterben ohne Vorwarnung. Server-Ausfaelle kosten nicht nur Daten -- sie kosten Vertrauen und Umsatz.',
    stat: '140.000 \u20AC',
    statLabel: 'durchschnittlicher Schaden pro Stunde Ausfall',
  },
  {
    icon: <PersonWarningIcon />,
    title: 'Menschliches Versagen',
    description:
      'Ein falscher Klick, eine geloeschte Datei, ein ueberschriebenes Dokument -- Fehler passieren. Die Frage ist nur: Gibt es ein Backup?',
    stat: '23%',
    statLabel: 'aller Datenverluste durch menschliche Fehler',
  },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const heading = section.querySelector('.problem-heading')
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--color-bg)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="problem-heading text-center mb-16 md:mb-20">
          <p className="text-[var(--color-orange)] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Das Risiko
          </p>
          <h2
            className="font-display font-800 text-[var(--color-text)] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            Was steht auf dem Spiel?
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Datenverlust trifft Unternehmen jeden Tag. Nicht in der Theorie — in
            der Realit&auml;t.
          </p>
        </div>

        {/* Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario, i) => (
            <div
              key={scenario.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)] hover:border-[var(--color-orange)]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-5 text-[var(--color-text-muted)]">{scenario.icon}</div>

              {/* Title */}
              <h3 className="font-display font-700 text-xl text-[var(--color-text)] mb-3">
                {scenario.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                {scenario.description}
              </p>

              {/* Stat */}
              <div className="pt-5 border-t border-[var(--color-border)]">
                <span className="font-display font-800 text-2xl text-[var(--color-orange)]">
                  {scenario.stat}
                </span>
                <p className="text-[var(--color-text-muted)] text-xs mt-1">
                  {scenario.statLabel}
                </p>
              </div>

              {/* Subtle orange accent on top */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--color-orange)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
