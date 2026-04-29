# Design Architecture — Ingolution

## Page Structure (One-Pager)

```
┌──────────────────────────────────────────────────────┐
│ NAV — Logo left, minimal links right, sticky         │
├──────────────────────────────────────────────────────┤
│ HERO — FaultyTerminal WebGL fullscreen               │
│  "Das passiert wenn Ihre Daten verloren gehen."      │
│  [Erleben Sie es selbst] CTA button                  │
│  → Click triggers 3s data-loss animation             │
│  → Auto-scrolls to Problem section                   │
├──────────────────────────────────────────────────────┤
│ PROBLEM — What's at stake without backup             │
│  3-column bento cards: data loss scenarios           │
│  Orange accent color (warning/danger energy)         │
├──────────────────────────────────────────────────────┤
│ SOLUTION — How Ingolution protects you               │
│  Split layout: visual left, text right               │
│  Green accent color (safety/trust energy)            │
│  3 key benefits as animated counters/icons           │
├──────────────────────────────────────────────────────┤
│ ABOUT — Wer ist Ingolution                           │
│  Minimal: photo placeholder + short bio              │
│  "Ich bin Ingo. Backups sind mein Business."         │
├──────────────────────────────────────────────────────┤
│ CONTACT — Simple lead capture                        │
│  Name + Email only, send button                      │
│  Pre-filled message hint                             │
├──────────────────────────────────────────────────────┤
│ FOOTER — Legal links, policy                         │
│  Impressum · Datenschutz                             │
│  Policy: firmenabc.at/ingolution-gmbh_JENm          │
└──────────────────────────────────────────────────────┘
```

## Key Interaction: Hero CTA Button
1. User clicks "Erleben Sie es selbst" 
2. FaultyTerminal glitch intensity maxes out (1.5s)
3. Text on page glitches/scrambles
4. Screen flashes briefly
5. Auto-smooth-scroll to Problem section
6. Effect resets

## Atmosphere
- Hero: dark overlay on FaultyTerminal (not pure white behind it)
  The terminal IS the hero background. White text over green glitch.
- Below hero: warm off-white (#F8F7F4), light and airy
- Problem section: subtle orange-muted tint on cards
- Solution section: subtle green-muted tint on cards
- Overall rhythm: dark hero → light content → dark-ish footer

## Typography Rhythm
- Hero: Syne 800, massive, white, centered
- Section headings: Syne 700, dark green
- Body: Inter 400, #1A1A18
- Stats/numbers: Syne 700, large, green

## Responsive
- Mobile: hero text smaller (clamp handles it), stacked sections
- Bento grid: 3col desktop → 1col mobile
- Nav: hamburger on mobile
- Contact form: full-width on mobile

## Assets Needed
- Logo from Ingo (green + white versions) — placeholder until provided
- No hero image needed (FaultyTerminal IS the hero)

## Status
- Phase 3 (Build) — ready to code
