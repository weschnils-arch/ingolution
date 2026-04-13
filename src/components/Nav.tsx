import { useState, useEffect, useRef } from 'react'
import { clsx } from 'clsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const links = [
    { label: 'Problem', id: 'problem' },
    { label: 'Lösung', id: 'solution' },
    { label: 'Prozess', id: 'process' },
  ]

  return (
    <nav
      ref={navRef}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
        scrolled
          ? 'py-2 top-3 left-4 right-4 md:left-8 md:right-8 rounded-2xl'
          : 'py-5'
      )}
      style={scrolled ? {
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      } : undefined}
    >
      {/* Noise grain overlay for glass texture */}
      {scrolled && (
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between relative">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative group"
        >
          <img
            src="/logo.webp"
            alt="Ingolution"
            className={clsx(
              'h-7 md:h-8 w-auto transition-all duration-500',
              !scrolled && 'brightness-0 invert'
            )}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={clsx(
                'relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full',
                scrolled
                  ? 'text-[var(--color-text-muted)] hover:text-[var(--color-green)] hover:bg-[var(--color-green-muted)]'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              {link.label}
            </button>
          ))}
          <div className="w-px h-5 bg-current opacity-15 mx-2" />
          <button
            onClick={() => scrollTo('contact')}
            className={clsx(
              'text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03]',
              scrolled
                ? 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-light)] shadow-lg shadow-[var(--color-green)]/20'
                : 'bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25'
            )}
          >
            Kontakt
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={clsx(
            'w-6 h-0.5 transition-all duration-300 origin-center',
            menuOpen
              ? 'bg-[var(--color-green)] rotate-45 translate-y-2'
              : scrolled ? 'bg-[var(--color-text)]' : 'bg-white'
          )} />
          <span className={clsx(
            'w-6 h-0.5 transition-all duration-300',
            menuOpen ? 'opacity-0 scale-0' : (scrolled ? 'bg-[var(--color-text)]' : 'bg-white')
          )} />
          <span className={clsx(
            'w-6 h-0.5 transition-all duration-300 origin-center',
            menuOpen
              ? 'bg-[var(--color-green)] -rotate-45 -translate-y-2'
              : scrolled ? 'bg-[var(--color-text)]' : 'bg-white'
          )} />
        </button>
      </div>

      {/* Mobile menu — glassmorphism dropdown */}
      <div className={clsx(
        'md:hidden overflow-hidden transition-all duration-500',
        menuOpen ? 'max-h-80 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
      )}>
        <div
          className="mx-4 rounded-2xl px-6 py-5 flex flex-col gap-3"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-[var(--color-text-muted)] hover:text-[var(--color-green)] transition-colors font-medium py-2 px-3 rounded-xl hover:bg-[var(--color-green-muted)]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="text-sm font-semibold px-5 py-3 rounded-full bg-[var(--color-green)] text-white w-full mt-2 hover:bg-[var(--color-green-light)] transition-colors"
          >
            Kontakt aufnehmen
          </button>
        </div>
      </div>
    </nav>
  )
}
