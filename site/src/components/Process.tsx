import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Analyse',
    desc: 'Wir analysieren Ihre bestehende IT-Infrastruktur und identifizieren kritische Daten und Schwachstellen.',
    detail: 'Kostenlose Erstberatung',
  },
  {
    number: '02',
    title: 'Setup',
    desc: 'Wir richten Ihre individuelle Backup-Lösung ein — automatisiert, verschlüsselt und maßgeschneidert.',
    detail: 'Schlüsselfertiges System',
  },
  {
    number: '03',
    title: 'Schutz',
    desc: 'Ihre Daten werden ab sofort automatisch gesichert. Wir überwachen, testen und optimieren laufend.',
    detail: 'Rund um die Uhr geschützt',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const els = section.querySelectorAll('.process-reveal')
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      )
    })

    const line = section.querySelector('.process-line')
    if (line) {
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: line, start: 'top 85%' },
        }
      )
    }
  }, [])

  return (
    <section id="process" ref={sectionRef} className="py-28 px-6 bg-[var(--color-bg)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 process-reveal">
          <span className="inline-block text-[var(--color-green)] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            So funktioniert's
          </span>
          <h2
            className="font-display font-700 text-[var(--color-text)] tracking-tight mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
          >
            In 3 Schritten zum
            <span className="text-[var(--color-green)]"> sicheren Backup</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
            Unkompliziert, schnell und auf Ihr Unternehmen zugeschnitten.
          </p>
        </div>

        <div className="relative">
          <div className="process-line absolute left-[28px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[var(--color-green)]/15 origin-top" />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={step.number}
                  className={`process-reveal relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="inline-block">
                      <span className="font-display font-800 text-6xl text-[var(--color-green)]/10 leading-none">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-display font-700 text-2xl text-[var(--color-text)] mt-2 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed text-sm max-w-sm inline-block">
                      {step.desc}
                    </p>
                    <p className="mt-4 text-xs font-semibold text-[var(--color-green)] tracking-wider uppercase">
                      {step.detail}
                    </p>
                  </div>

                  <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[var(--color-green)] flex items-center justify-center shadow-lg shadow-[var(--color-green)]/20">
                    <span className="font-display font-800 text-white text-lg">{step.number}</span>
                  </div>

                  <div className="md:hidden flex-1">
                    <h3 className="font-display font-700 text-xl text-[var(--color-text)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                      {step.desc}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-[var(--color-green)] tracking-wider uppercase">
                      {step.detail}
                    </p>
                  </div>

                  <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:pl-16' : 'md:pr-16'}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
