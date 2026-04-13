import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scenarios = [
  {
    icon: '\u{1F512}',
    title: 'Ransomware-Angriff',
    description:
      'Ihre gesamten Unternehmensdaten werden verschluesselt. Kein Zugriff, kein Backup, keine Verhandlung -- nur Stillstand.',
    stat: '71%',
    statLabel: 'aller KMU erholen sich nie vollstaendig',
  },
  {
    icon: '\u{1F4A5}',
    title: 'Hardware-Crash',
    description:
      'Festplatten sterben ohne Vorwarnung. Server-Ausfaelle kosten nicht nur Daten -- sie kosten Vertrauen und Umsatz.',
    stat: '140.000 \u20AC',
    statLabel: 'durchschnittlicher Schaden pro Stunde Ausfall',
  },
  {
    icon: '\u{1FAE3}',
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
              <div className="text-3xl mb-5">{scenario.icon}</div>

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
