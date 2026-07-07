# Portfolio Redesign Brief — "Game-Mode" Developer Portfolio

**For:** Muthukumaran S (Full-Stack Developer — Node.js, TypeScript, React.js, PostgreSQL)

---

## 1. The Core Idea

Move away from the cyberpunk-glow theme and rebuild the portfolio so that browsing it **feels like playing a simple, polished game** — without being gimmicky, laggy, or hard to read. Think **"a clean indie game main-menu and level-select screen"**, not an arcade cabinet. The playful mechanics live in the _interactions and metaphors_, not in clutter. Every section maps to a game concept, but the visual language stays minimal, legible, and fast.

**Tone:** Calm-confident game UI (like a modern indie RPG main menu) — not neon overload, not childish, not slow-loading.

---

## 2. Build Instruction

Build a developer portfolio website that feels like a simple, polished video game when you browse it — while staying genuinely clean, minimal, and fast.

### Game Metaphor (map 1:1 to real portfolio content)

| Section | Game Metaphor | Notes |
|---|---|---|
| Landing / Hero | **"Start Screen"** | Press-start style CTA, character name = my name, role = character class/title, subtitle typewriter = quest log line |
| Navigation | **"Level Select / HUD Bar"** | Pinned to top; sections unlock visually as you scroll — a progress path/trail fills in, like a game level tracker |
| Experience | **"Quest Log"** | Each job = a completed level/stage with a small badge/checkpoint icon |
| Projects | **"Boss Battles / Level Cards"** | Each project is a card you "select" — hover reveals stats like an item/character stat panel: tech stack as "loadout" |
| Skills | **"Inventory / Skill Tree"** | Progress bars become XP bars; categories become inventory tabs/slots |
| Testimonials | **"Achievements / Reviews from the Guild"** | Short cards like unlocked-achievement toasts |
| Contact / Footer | **"Save & Continue / Next Level"** | Save-slot style CTA and contact form |

---

## 3. Interaction Rules

Keep it game-like but **not gimmicky**:

- **Micro-interactions:** Hover states behave like button-press feedback — slight scale, satisfying easing, NOT slow or bouncy to the point of feeling laggy.
- **Persistent XP bar:** A subtle scroll-progress indicator (like a level/XP bar) that fills as the user scrolls through sections.
- **Section transitions:** Feel like "loading into the next level" — quick, smooth, never blocking, never longer than ~300–400 ms.
- **Achievement toasts:** A small "achievement unlocked" toast the first time a user reaches a new section — dismissible, non-intrusive, doesn't repeat.
- **Custom cursor:** Optional; must **never** slow down scrolling or typing.

---

## 4. Non-Negotiable Design Quality Bars

1. **Visually clean and minimal** — generous whitespace, restrained color palette (2–3 accent colors max, one light base), no visual noise or clutter.
2. **Fully responsive** — perfect on mobile (360 px+), tablet, and desktop. No horizontal scroll. No overlapping text. Test at 360, 768, 1024, and 1440 px.
3. **Typography-led design** — clear type scale, readable line-length, consistent spacing rhythm (use a spacing scale, not arbitrary px values).
4. **Accessible** — WCAG AA contrast minimum, keyboard-navigable, `prefers-reduced-motion` support, semantic HTML.
5. **Performance-first** — no heavy animation libraries running unnecessarily; lazy-load images/sections; target Lighthouse performance ≥ 90.
6. **Consistent component system** — buttons, cards, badges, and section headers all share one visual language; no one-off styles.
7. **The "game" feeling comes from motion/metaphor/microcopy**, NOT from cheesy pixel-art or arcade fonts — keep it premium.

---

## 5. Visual Direction

| Element | Old (cyberpunk) | New (game-mode) |
|---|---|---|
| Palette | Neon cyan/gold on near-black | **Light base** + teal + orange accents, used sparingly |
| Fonts | Sora + Space Mono | **Inter** (headers/body) + **JetBrains Mono** (tags/labels/numbers only) |
| Motion | Glow, glitch, particles | Level-load transitions, progress-bar fills, press-feedback |
| Navigation | Frosted navbar | HUD-style top bar with scroll-progress "level bar" |
| Cursor | Custom lerping cursor | Lightweight custom cursor (enabled) |
| Cards | Glow-shadow panels | Flat cards with clear hover "select" state, like item cards |

---

## 6. Content to Preserve (rewritten into new metaphor)

### Experience
- **Skandvel Webtech** — Full-Stack Developer, Aug 2023–Present
- **AttendTrack** — Capstone project lead role
- **Self-taught phase** — Foundation: Node.js, TypeScript, databases

### Projects
- ConnectMe
- NEET MCQ Platform
- Valan Bay
- AttendTrack

### Skills Groups
- Backend
- Frontend
- Database
- Auth & Security
- Tools & Cloud

### Testimonials
- Rajesh Kumar
- James Whitfield
- Anand Selvam

---

## 7. Tech Stack

| Package | Purpose |
|---|---|
| React 18 + TypeScript | Core UI |
| Vite | Build tool |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Meaningful transitions only (used sparingly) |
| Lucide React | Icons |
| clsx + tailwind-merge | Class utilities |

---

## 8. File Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── fonts/                        # self-hosted fonts (optional)
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   │
│   ├── assets/
│   │   ├── icons/                    # custom SVG icons not in Lucide
│   │   └── images/
│   │
│   ├── styles/
│   │   └── globals.css               # Tailwind layers, base resets, CSS vars
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # HUD-style nav bar + scroll-progress
│   │   │   ├── Footer.tsx            # "Save & Continue" footer
│   │   │   └── PageLayout.tsx        # Main page wrapper
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx            # Game-menu press-feedback button
│   │   │   ├── Card.tsx              # Flat inventory/item card
│   │   │   ├── Badge.tsx             # Tech-stack pill tags
│   │   │   ├── ProgressBar.tsx       # XP bars (scroll progress + skills)
│   │   │   ├── AchievementToast.tsx  # "Achievement Unlocked" toast
│   │   │   ├── SectionHeading.tsx    # Game-style section headers
│   │   │   └── CustomCursor.tsx      # Lightweight custom cursor
│   │   │
│   │   └── sections/
│   │       ├── Hero.tsx              # "Start Screen"
│   │       ├── Experience.tsx        # "Quest Log"
│   │       ├── Projects.tsx          # "Boss Battles / Level Cards"
│   │       ├── Skills.tsx            # "Inventory / Skill Tree"
│   │       ├── Testimonials.tsx      # "Achievements / Guild Reviews"
│   │       └── Contact.tsx           # "Save & Continue / Next Level"
│   │
│   ├── hooks/
│   │   ├── useScrollProgress.ts      # Drives the HUD XP progress bar
│   │   ├── useInView.ts              # Section-enter detection for toasts
│   │   ├── useTypewriter.ts          # Typewriter effect for Hero subtitle
│   │   └── useReducedMotion.ts       # Respects prefers-reduced-motion
│   │
│   ├── data/
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── testimonials.ts
│   │
│   ├── types/
│   │   └── index.ts                  # Shared TS interfaces
│   │
│   └── lib/
│       └── utils.ts                  # cn(), clamp(), etc.
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
├── CLAUDE.md                         # This file — project brief & reference
└── README.md
```

---

## 9. Build Order

Follow this sequence to build correctly and avoid rework:

1. **Config** — Tailwind palette, type scale, CSS variables.
2. **UI primitives** — `Button`, `Card`, `ProgressBar`, `Badge`, `SectionHeading` — lock the shared visual language first.
3. **Navbar** — HUD bar with live scroll-progress XP bar.
4. **Hero + Contact** — The bookends of the page.
5. **Experience, Projects, Skills, Testimonials** — Fill sections using data files.
6. **Framer Motion** — Add transitions only _after_ static layout is correct at all breakpoints.
7. **AchievementToast + CustomCursor** — Pure enhancement, added last.
8. **Audit** — Responsiveness pass (360 / 768 / 1024 / 1440 px) + Lighthouse run.

---

## 10. Accessibility Checklist

- [ ] All colors pass WCAG AA contrast ratio (≥ 4.5:1 for normal text)
- [ ] Every interactive element is keyboard-focusable with a visible focus ring
- [ ] `prefers-reduced-motion` disables all non-essential animations
- [ ] Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` used correctly
- [ ] All images have descriptive `alt` attributes
- [ ] No horizontal scroll at any breakpoint

---

_This file is the authoritative project brief. All implementation decisions should refer back to the constraints and metaphors defined here._
