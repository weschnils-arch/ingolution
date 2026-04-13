import { useRef, useState, useEffect } from 'react'
import FaultyTerminal from './FaultyTerminal'

interface HeroProps {
  onTriggerDataLoss: () => void
}

export default function Hero({ onTriggerDataLoss }: HeroProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [glitching, setGlitching] = useState(false)
  const [btnText, setBtnText] = useState('Erleben Sie es selbst')

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    const timer = setTimeout(() => {
      el.style.transition = 'opacity 1.2s ease, transform 1.2s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleCTA = () => {
    if (glitching) return
    setGlitching(true)
    setBtnText('Daten werden geloescht...')

    onTriggerDataLoss()

    setTimeout(() => {
      const el = document.getElementById('problem')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setGlitching(false)
      setBtnText('Erleben Sie es selbst')
    }, 3200)
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <FaultyTerminal
          scale={3}
          gridMul={[2, 1]}
          digitSize={3}
          timeScale={glitching ? 4 : 1.7}
          scanlineIntensity={0.5}
          glitchAmount={glitching ? 3 : 1}
          flickerAmount={glitching ? 2 : 1}
          noiseAmp={1}
          curvature={0.47}
          tint="#6eb964"
          mouseReact={true}
          mouseStrength={1.6}
          pageLoadAnimation={true}
          brightness={glitching ? 1.5 : 1}
          chromaticAberration={glitching ? 0.003 : 0}
        />
      </div>

      <div className={`absolute inset-0 transition-opacity duration-500 ${glitching ? 'opacity-20' : 'opacity-50'}`}
           style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 100%)' }} />

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-[var(--color-green-light)] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-6">
          Datensicherung &middot; Backup-Loesungen &middot; B2B
        </p>

        <h1 className="text-white leading-[0.95] tracking-[-0.03em] mb-8 uppercase whitespace-nowrap text-center mx-auto"
            style={{ fontSize: 'clamp(28px, 5.2vw, 80px)', fontFamily: 'var(--font-hero)', fontWeight: 900 }}>
          <span className="block text-center">Das passiert, wenn Ihre</span>
          <span className="block text-center text-[var(--color-green-light)]">Daten verloren gehen.</span>
        </h1>

        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 font-sans leading-relaxed">
          Kein Backup. Kein Zurueck.
          Ingolution sorgt dafuer, dass dieser Moment nie eintritt.
        </p>

        <button
          onClick={handleCTA}
          data-cursor
          className={`
            inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base
            transition-all duration-300
            ${glitching
              ? 'bg-[var(--color-orange)] text-white cursor-wait scale-105'
              : 'bg-white text-[var(--color-green-dark)] hover:bg-[var(--color-green)] hover:text-white hover:scale-105'
            }
          `}
        >
          {glitching && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {btnText}
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-xs tracking-widest uppercase">Scrollen</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
