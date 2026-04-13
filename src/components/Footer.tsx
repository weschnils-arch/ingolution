export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="/logo.webp"
            alt="Ingolution"
            className="h-6 w-auto"
            loading="lazy"
          />
        </div>

        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
          <a
            href="https://www.firmenabc.at/ingolution-gmbh_JENm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-green)] transition-colors"
          >
            Impressum
          </a>
          <span className="w-px h-4 bg-[var(--color-border)]" />
          <a
            href="https://www.firmenabc.at/ingolution-gmbh_JENm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-green)] transition-colors"
          >
            Datenschutz
          </a>
        </div>

        <p className="text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Ingolution GmbH
        </p>
      </div>
    </footer>
  )
}
