# Ingolution — Architecture & Project Status

> Last updated: 2026-04-13

## Client

- **Name:** Ingo Neururer
- **Company:** Ingolution GmbH
- **Industry:** B2B data backup / IT security (Datensicherung)
- **Location:** Austria (DACH)
- **Contact:** office@ingolution.at
- **Legal page:** firmenabc.at/ingolution-gmbh_JENm

## Project Status: Phase 3 — Build (In Progress)

Site is live on **Vercel** via GitHub auto-deploy from `weschnils-arch/ingolution`.
All core sections are built. Polish and responsive pass still needed.

## Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Animations | GSAP + ScrollTrigger (fromTo only) |
| Smooth scroll | Lenis |
| Motion | motion (Framer Motion) |
| 3D/WebGL | OGL (FaultyTerminal shader) |
| Utilities | clsx |
| Deploy | Vercel (auto-deploy from GitHub push) |
| Repo | github.com/weschnils-arch/ingolution |

## File Structure

```
Ingolution/
├── _project/
│   ├── architecture.md          ← this file
│   ├── design-system.md         ← Phase 1 output
│   ├── design-architecture.md   ← Phase 2 output
│   ├── call-transcript.pdf      ← onboarding call
│   ├── Google-Meet-*.pdf        ← meeting notes
│   └── hero-reference.png       ← visual reference
└── site/
    ├── vercel.json              ← SPA rewrite rule
    ├── package.json
    ├── public/
    │   └── logo.webp
    └── src/
        ├── App.tsx              ← root: Lenis, GSAP, section layout
        ├── index.css            ← CSS vars, fonts, Tailwind
        └── components/
            ├── Nav.tsx          ← glassmorphism sticky nav
            ├── Cursor.tsx       ← custom dot+follower cursor
            ├── Hero.tsx         ← fullscreen FaultyTerminal bg, CTA blackout effect
            ├── FaultyTerminal.tsx/css ← OGL WebGL shader (matrix rain)
            ├── Problem.tsx      ← 3-col bento cards (ransomware/crash/human error)
            ├── Solution.tsx     ← split layout, 3 benefits, green accent
            ├── Process.tsx      ← process/how-it-works section
            ├── Contact.tsx      ← name+email form (mailto)
            ├── Footer.tsx       ← logo, legal links, copyright
            └── DataLossOverlay.tsx ← DEAD CODE (no longer imported)
```

## What Is Built

| Section | Status | Notes |
|---|---|---|
| Nav | Done | Glassmorphism, sticky, logo left |
| Custom Cursor | Done | Dot + follower, reacts to `data-cursor` |
| Hero | Done | FaultyTerminal WebGL bg, CTA blackout effect (text fades → pixel bg → black → scroll to Problem) |
| Problem | Done | 3 bento cards with SVG icons, orange accent, scroll-triggered reveals |
| Solution | Done | Split layout (visual left / benefits right), green accent, numbered items |
| Process | Done | How-it-works section |
| Contact | Done | Name + Email form, mailto submission |
| Footer | Done | Logo, Impressum/Datenschutz links (firmenabc.at), copyright |
| Lenis | Done | Smooth scroll, wired to GSAP ticker |
| GSAP reveals | Done | All sections use fromTo with ScrollTrigger |

## What Still Needs Work

| Task | Priority |
|---|---|
| Full responsive pass (test all breakpoints, mobile hamburger, stacked layouts, clamp typography) | High |
| Remove DataLossOverlay.tsx (dead code, not imported) | Low |
| About section missing — only Nav/Hero/Problem/Solution/Process/Contact/Footer exist | Medium |
| Dev server / preview port not assigned | Medium |
| Vercel CLI not authenticated on EC2 — deploys happen via GitHub push only | Known limitation |

## Design Decisions

- **Dark mode** — dark bg (#0a0a0a) was chosen to match the "data loss / cybersecurity" theme
- **FaultyTerminal** — custom OGL shader creating matrix-style rain, not a library component
- **CTA interaction** — "Erleben Sie es selbst" fades all text, reveals raw pixel background, then blackout + scroll to Problem section. Resets after scroll completes.
- **Icons** — Problem cards use inline SVG icons styled like SF Symbols (shield-lock, server-crash, person-warning) instead of emoji or icon libraries
- **Contact form** — uses mailto: instead of a backend endpoint (Ingo's preference for simplicity)
- **showContent** — was previously gated by a data loss trigger; now defaults to `true` so all sections are always visible

## Git History (10 commits)

```
ff8e14d fix: remove unused onTriggerDataLoss prop, show all sections by default
c145682 Replace emoji icons with SF Symbol-style SVGs in Problem section
d6b0982 Hero: 2-line text, CTA shows pixel bg then fades to black
1fcf396 fix: center hero text — remove whitespace-nowrap that caused overflow
3a83c73 perf: remove 9-sample blur from shader, cap DPR to 1.5, center hero text
1b255e0 Fix hero text to exactly 2 lines on desktop
0e6b22c Replace logo with transparent background version
f6ab28d Hero: switch to Montserrat (Gotham alternative), 2-row layout, uppercase
66ed817 fix: set base to / for Vercel deployment
4d68a33 Initial commit — Ingolution one-pager website
```
