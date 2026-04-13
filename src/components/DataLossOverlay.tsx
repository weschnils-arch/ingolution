import { useEffect, useRef } from 'react'

interface DataLossOverlayProps {
  active: boolean
}

const glitchLines = [
  'FEHLER: DATEISTRUKTUR BESCHÄDIGT',
  'ERROR_CODE: 0x000000EF',
  'BACKUP NOT FOUND',
  '>>> DATEN WERDEN GELÖSCHT <<<',
  'KRITISCHER SYSTEMFEHLER',
  'WIEDERHERSTELLUNG FEHLGESCHLAGEN',
  'DATA CORRUPTION DETECTED',
  'ALLE DATEIEN BETROFFEN',
]

export default function DataLossOverlay({ active }: DataLossOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const text = textRef.current
    if (!text) return

    let i = 0
    const interval = setInterval(() => {
      const line = glitchLines[i % glitchLines.length]
      text.textContent = line
      i++
    }, 200)

    return () => clearInterval(interval)
  }, [active])

  if (!active) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        animation: 'glitchFade 3.2s ease-in-out forwards',
      }}
    >
      <style>{`
        @keyframes glitchFade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .glitch-scanline {
          position: absolute;
          width: 100%;
          height: 2px;
          background: rgba(45, 90, 61, 0.4);
          animation: scanline 0.3s linear infinite;
        }
      `}</style>

      {/* Scanline effect */}
      <div className="glitch-scanline" />

      {/* Error text */}
      <div className="text-center px-8">
        <div
          ref={textRef}
          className="font-mono text-[var(--color-green-light)] text-xl md:text-3xl font-bold tracking-wider"
          style={{
            textShadow: '0 0 20px rgba(74, 140, 92, 0.8), 0 0 60px rgba(74, 140, 92, 0.4)',
            filter: 'blur(0.5px)',
          }}
        />
        <p className="text-white/30 text-sm mt-4 font-mono tracking-widest">
          INGOLUTION — WÄRE DAS VERHINDERT WORDEN
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--color-green-light)]/50" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[var(--color-green-light)]/50" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[var(--color-green-light)]/50" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--color-green-light)]/50" />
    </div>
  )
}
