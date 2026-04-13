import { useRef, useState, useEffect } from 'react'
import FaultyTerminal from './FaultyTerminal'

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)
  const [glitching, setGlitching] = useState(false)

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

    // Phase 1: Hide all text, show only the FaultyTerminal background
    const textEl = textRef.current
    if (textEl) {
      textEl.style.transition = 'opacity 0.3s ease'
      textEl.style.opacity = '0'
      textEl.style.pointerEvents = 'none'
    }

    // Phase 2: After 1s, fade the whole hero to black
    setTimeout(() => {
      const blackout = document.getElementById('hero-blackout')
      if (blackout) {
        blackout.style.transition = 'opacity 1s ease'
        blackout.style.opacity = '1'
      }
    }, 1000)

    // Phase 3: After 2s total, scroll down and reset
    setTimeout(() => {
      const el = document.getElementById('problem')
      if (el) el.scrollIntoView({ behavior: 'smooth' })

      // Reset after scroll
      setTimeout(() => {
        if (textEl) {
          textEl.style.transition = 'opacity 0.8s ease'
          textEl.style.opacity = '1'
          textEl.style.pointerEvents = ''
        }
        const blackout = document.getElementById('hero-blackout')
        if (blackout) {
          blackout.style.transition = 'opacity 0.8s ease'
          blackout.style.opacity = '0'
        }
        setGlitching(false)
      }, 1200)
    }, 2000)
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

      {/* Blackout overlay for CTA effect */}
      <div id="hero-blackout" className="absolute inset-0 z-[15] bg-black pointer-events-none" style={{ opacity: 0 }} />

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <p className="text-[var(--color-green-light)] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-6">
          Datensicherung &middot; Backup-Loesungen &middot; B2B
        </p>

        <h1 className="text-white leading-[0.95] tracking-[-0.03em] mb-8 uppercase text-center w-full"
            style={{ fontSize: 'clamp(26px, 4.5vw, 72px)', fontFamily: 'var(--font-hero)', fontWeight: 900 }}>
          Das passiert, wenn Ihre{' '}
          <span className="text-[var(--color-green-light)]">Daten verloren gehen.</span>
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
          Erleben Sie es selbst
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-xs tracking-widest uppercase">Scrollen</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
