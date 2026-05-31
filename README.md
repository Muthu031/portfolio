# Muthukumaran S — Portfolio

Personal developer portfolio built with React 18 + TypeScript + Vite.

**Live at:** `npm run dev` → [http://localhost:5173](http://localhost:5173)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Bundler | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Space Mono + Sora (Google Fonts) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed top nav with active section tracking
│   │   └── Footer.tsx          # Footer with social links
│   ├── sections/
│   │   ├── Hero.tsx            # Full-viewport hero with particle canvas
│   │   ├── About.tsx           # Bio, stats, timeline, photo
│   │   ├── Skills.tsx          # Skill cards grouped by category
│   │   ├── Projects.tsx        # 4 featured projects with mock UI previews
│   │   ├── Experience.tsx      # Animated vertical timeline
│   │   ├── Testimonials.tsx    # Auto-play carousel
│   │   └── Contact.tsx         # Validated contact form
│   └── ui/
│       ├── AnimatedText.tsx    # Staggered word/char reveal
│       ├── Badge.tsx           # Status badges
│       ├── Button.tsx          # 3-variant button with glow
│       ├── CustomCursor.tsx    # Animated dot + ring cursor
│       ├── ScrollProgressBar.tsx
│       ├── Tag.tsx             # Tech stack chips
│       └── TypewriterText.tsx  # Typewriter effect component
├── data/
│   ├── experience.ts           # Work history
│   ├── projects.ts             # Project cards
│   ├── skills.ts               # Skill categories
│   └── testimonials.ts         # Testimonial quotes
├── hooks/
│   ├── useIntersectionObserver.ts
│   ├── useScrollProgress.ts
│   └── useTypewriter.ts
├── styles/
│   └── globals.css             # Tailwind base + custom animations
├── types/
│   └── index.ts                # All TypeScript interfaces
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## Sections

1. **Hero** — Particle + grid canvas background, glitch name animation, typewriter role cycler, CTA buttons, social links
2. **About** — Profile photo in hexagonal clip-path frame, animated count-up stats, career timeline
3. **Skills** — Visual grid of skill cards with proficiency bars, grouped by Backend / Frontend / Database / Auth / Tools
4. **Projects** — ConnectMe, NEET MCQ Platform, Valan Bay, AttendTrack — with tech chips and GitHub links
5. **Experience** — Skandvel Webtech (Aug 2023–Present), Capstone Lead, Self-Taught journey
6. **Testimonials** — Auto-playing 6-second carousel with manual navigation
7. **Contact** — TypeScript-validated form with success/error states

---

## Customisation

### Update personal details
All personal data lives in `src/data/` — edit those files to update content without touching any component.

### Wire up the contact form
Open `src/components/sections/Contact.tsx` and replace the simulated send with EmailJS:

```ts
// Install: npm install @emailjs/browser
import emailjs from '@emailjs/browser';

await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  { name: form.name, email: form.email, message: form.message },
  'YOUR_PUBLIC_KEY'
);
```

### Add resume PDF
Drop your PDF as `public/resume.pdf` — the "Download Resume" button in the Hero already points to `/resume.pdf`.

---

## Contact

**Muthukumaran S**
- Email: [muthukumaran6967@gmail.com](mailto:muthukumaran6967@gmail.com)
- LinkedIn: [linkedin.com/in/muthukumaran-s](https://www.linkedin.com/in/muthukumaran-s/)
- GitHub: [github.com/Muthu031](https://github.com/Muthu031)
- Phone: +91 88383 36941
