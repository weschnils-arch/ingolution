import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const els = section.querySelectorAll('.reveal-item')
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <div className="reveal-item">
            <div className="aspect-square max-w-md mx-auto md:mx-0 rounded-3xl bg-[var(--color-green)] relative overflow-hidden flex items-center justify-center">
              {/* Placeholder avatar */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-5xl">
                  👤
                </div>
                <p className="text-white/60 text-sm tracking-wider">INGO NEURURER</p>
                <p className="text-white font-display font-700 text-xl mt-1">Ingolution GmbH</p>
              </div>
              {/* Decorative corner accent */}
              <div className="absolute top-6 right-6 w-16 h-16 border-2 border-white/20 rounded-2xl" />
              <div className="absolute bottom-6 left-6 w-8 h-8 bg-[var(--color-orange)] rounded-xl opacity-60" />
            </div>
          </div>

          {/* Right — text */}
          <div>
            <span className="reveal-item inline-block text-[var(--color-green)] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-5">
              Über Ingolution
            </span>
            <h2 className="reveal-item font-display font-700 text-[var(--color-text)] tracking-tight mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Backup ist kein IT-Thema.
              <br />
              <span className="text-[var(--color-green)]">Es ist Business-Absicherung.</span>
            </h2>
            <p className="reveal-item text-[var(--color-text-muted)] leading-relaxed mb-5">
              Mein Name ist Ingo Neururer. Mit Ingolution helfe ich Unternehmen dabei,
              ihre wertvollste Ressource zu schützen: ihre Daten.
            </p>
            <p className="reveal-item text-[var(--color-text-muted)] leading-relaxed mb-8">
              Ich weiß, wie es sich anfühlt, wenn alles weg ist — das heiß-kalt-Gefühl, der Flash in der Brust.
              Genau diesen Moment möchte ich für meine Kunden verhindern.
              Kein kompliziertes IT-Kauderwelsch. Nur verlässliche Datensicherung, erklärt auf Augenhöhe.
            </p>

            <div className="reveal-item flex flex-wrap gap-4">
              <div className="px-5 py-3 rounded-xl bg-[var(--color-green-muted)] text-[var(--color-green)] text-sm font-semibold">
                B2B · Backup-Lösungen
              </div>
              <div className="px-5 py-3 rounded-xl bg-[var(--color-orange-muted)] text-[var(--color-orange)] text-sm font-semibold">
                Österreich &amp; DACH
              </div>
              <div className="px-5 py-3 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text-muted)] text-sm font-semibold">
                Persönlicher Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
