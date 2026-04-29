# Design System — Ingolution GmbH

## Client
- **Name**: Ingo Neururer
- **Company**: Ingolution GmbH
- **Industry**: IT / Data Security / Backup Solutions (B2B)
- **Target Audience**: Business owners, CTOs, IT managers in DACH region

## Core Brand Idea
"Was passiert, wenn Ihre Daten verloren gehen?" — visceral emotional impact of data loss.
Not a typical IT firm. Premium, artistic, approachable. Makes non-IT people feel understood.

## Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#F8F7F4` | Page background (warm off-white) |
| `--color-surface` | `#FFFFFF` | Cards, elevated surfaces |
| `--color-surface-2` | `#F2F0EC` | Subtle section backgrounds |
| `--color-green` | `#2D5A3D` | Primary brand — headings, accents, CTAs |
| `--color-green-light` | `#4A8C5C` | Hover states, secondary green |
| `--color-green-muted` | `#E8F0EB` | Soft green backgrounds |
| `--color-orange` | `#C17A2E` | Secondary accent — warnings, highlights |
| `--color-orange-light` | `#D4953E` | Hover orange |
| `--color-orange-muted` | `#FAF0E4` | Soft orange backgrounds |
| `--color-text` | `#1A1A18` | Primary text |
| `--color-text-muted` | `#6B6B64` | Secondary text |
| `--color-border` | `#E2E0DA` | Subtle borders |

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Hero | Syne | 700–800 | clamp(52px, 8vw, 120px) |
| Heading H2 | Syne | 600–700 | clamp(32px, 5vw, 64px) |
| Heading H3 | Syne | 600 | clamp(22px, 3vw, 36px) |
| Body | Inter | 400 | 16–18px |
| Caption | Inter | 400 | 13–14px |
| Button | Inter | 600 | 15px |

- Letter spacing on display: -0.03em
- Line height display: 0.95–1.05
- Line height body: 1.65

## Components

### Cursor
- Custom dot (8px, green) + follower ring (32px, green 30% opacity)
- Scales up on interactive elements
- Blends to orange on CTA hover

### FaultyTerminal
- WebGL/OGL shader — glitchy matrix of falling green digits
- Full-bleed hero background
- mouseReact enabled, pageLoadAnimation enabled
- tint: `#2D5A3D` (brand green)
- curvature: 0.47, glitchAmount: 1, flickerAmount: 1

### Buttons
- Primary: solid green bg, white text, rounded-full, px-8 py-4
- Secondary: outlined green, transparent bg
- Hover: scale(1.03), slight shadow, magnetic effect

### Cards
- Rounded-2xl (16px), white bg, subtle shadow
- Hover: translateY(-4px), shadow elevation increase

## Motion

- Lenis smooth scroll — always
- GSAP ScrollTrigger for section reveals (fromTo, stagger)
- Motion (Framer) for interactive micro-animations
- Section fade-up: y:40 → y:0, opacity 0 → 1, duration 0.8s

## Voice / Tone
- Confident but not arrogant
- Speaks to business owners, not IT geeks
- German (Austrian nuance welcome)
- Short punchy sentences
- Emotion first, tech second
