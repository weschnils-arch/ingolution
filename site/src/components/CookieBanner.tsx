import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

type Consent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  ts: number
}

const STORAGE_KEY = 'ingolution_cookie_consent_v1'

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Consent
  } catch {
    return null
  }
}

function saveConsent(c: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
  } catch {
    /* ignore */
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const existing = loadConsent()
    if (!existing) {
      const t = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(t)
    }
  }, [])

  const persist = (a: boolean, m: boolean) => {
    saveConsent({ necessary: true, analytics: a, marketing: m, ts: Date.now() })
    setVisible(false)
  }

  const acceptAll = () => persist(true, true)
  const rejectAll = () => persist(false, false)
  const saveSelection = () => persist(analytics, marketing)

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none">
      <div
        className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
        role="dialog"
        aria-live="polite"
        aria-label="Cookie-Einstellungen"
      >
        <div className="px-5 py-5 md:px-7 md:py-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="font-display font-700 text-[var(--color-text)] text-base md:text-lg mb-1">
                Cookies & Datenschutz
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer
                Website zu bieten. Notwendige Cookies sind für den Betrieb erforderlich.
                Andere helfen uns, das Angebot zu verbessern. Sie können Ihre
                Auswahl jederzeit widerrufen.
              </p>
            </div>
          </div>

          {showDetails && (
            <div className="mt-5 pt-5 border-t border-[var(--color-border)] grid gap-3">
              <ConsentRow
                title="Notwendig"
                description="Erforderlich für den technischen Betrieb der Website."
                checked
                disabled
                onChange={() => {}}
              />
              <ConsentRow
                title="Statistik"
                description="Anonyme Nutzungsanalyse zur Verbesserung der Website."
                checked={analytics}
                onChange={setAnalytics}
              />
              <ConsentRow
                title="Marketing"
                description="Personalisierte Inhalte und Werbeanzeigen Dritter."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-green)] transition-colors self-start sm:self-auto"
            >
              {showDetails ? 'Details ausblenden' : 'Einstellungen anpassen'}
            </button>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {showDetails ? (
                <button
                  type="button"
                  onClick={saveSelection}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
                >
                  Auswahl speichern
                </button>
              ) : (
                <button
                  type="button"
                  onClick={rejectAll}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  Nur notwendige
                </button>
              )}
              <button
                type="button"
                onClick={acceptAll}
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[var(--color-green)] text-white hover:bg-[var(--color-green-light)] transition-colors shadow-md shadow-[var(--color-green)]/20"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label
      className={clsx(
        'flex items-start gap-3 p-3 rounded-xl border transition-colors',
        disabled
          ? 'border-[var(--color-border)] bg-[var(--color-surface-2)]/40 cursor-not-allowed'
          : 'border-[var(--color-border)] hover:border-[var(--color-green)]/50 cursor-pointer'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[var(--color-green)]"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold text-[var(--color-text)]">{title}</p>
        <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </label>
  )
}
