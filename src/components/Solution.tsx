import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    number: '01',
    title: 'Automatische Backups',
    description:
      'Ihre Daten werden automatisch gesichert — stündlich oder in Echtzeit. Sie müssen sich um nichts kümmern.',
  },
  {
    number: '02',
    title: 'Schnelle Wiederherstellung',
    description:
      'Im Ernstfall sind Ihre Daten in Minuten wiederhergestellt. Kein Warten, kein Datenverlust, kein Produktivitätsverlust.',
  },
  {
    number: '03',
    title: 'Persönliche Betreuung',
    description:
      'Keine Hotline, kein Callcenter. Bei Ingolution haben Sie einen direkten Ansprechpartner, der Ihre Infrastruktur kennt.',
  },
]

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const heading = section.querySelector('.solution-heading')
    const visual = section.querySelector('.solution-visual')
    const items = section.querySelectorAll('.solution-item')

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

    if (visual) {
      gsap.fromTo(
        visual,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: visual,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: item,
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
      id="solution"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--color-surface-2)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="solution-heading text-center mb-16 md:mb-20">
          <p className="text-[var(--color-green)] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Die Lösung
          </p>
          <h2
            className="font-display font-800 text-[var(--color-text)] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            So schützt Ingolution
            <br />
            <span className="text-[var(--color-green)]">Ihr Business</span>
          </h2>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual left */}
          <div className="solution-visual relative">
            <div className="relative rounded-2xl overflow-hidden bg-[var(--color-green)] aspect-[4/3] flex items-center justify-center">
              {/* Abstract visual */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }} />
              </div>
              <div className="relative text-center px-8">
                <div className="text-white/20 leading-none font-display font-800 mb-4" style={{ fontSize: '120px' }}>
                  &#9741;
                </div>
                <p className="text-white/60 text-sm tracking-widest uppercase font-display">
                  Ihre Daten. Gesichert.
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:-right-6 bg-white rounded-xl shadow-lg px-5 py-4 border border-[var(--color-border)]">
              <p className="font-display font-700 text-[var(--color-green)] text-2xl">99.9%</p>
              <p className="text-[var(--color-text-muted)] text-xs">Verfügbarkeit</p>
            </div>
          </div>

          {/* Benefits right */}
          <div className="flex flex-col gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                className="solution-item group flex gap-5"
              >
                {/* Number */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-green-muted)] flex items-center justify-center group-hover:bg-[var(--color-green)] transition-colors duration-300">
                  <span className="font-display font-700 text-sm text-[var(--color-green)] group-hover:text-white transition-colors duration-300">
                    {benefit.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display font-700 text-lg text-[var(--color-text)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
