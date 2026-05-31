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

## Deploying to Vercel (with GitHub Actions CI/CD)

This project ships with a fully automated pipeline in `.github/workflows/deploy.yml`.  
Every push to `main` runs a type-check + build, then deploys to production automatically.  
Pull requests get a live preview URL posted as a PR comment.

### Prerequisites
- A [GitHub](https://github.com) account with this project pushed to a repository
- A [Vercel](https://vercel.com) account (free tier is enough)

---

### Step 1 — Push the project to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

### Step 2 — Install the Vercel CLI and link the project

Run these commands **once, locally**. You only ever do this once.

```bash
# Install Vercel CLI globally
npm install -g vercel

# Log in — a browser window opens, sign in with your GitHub account
vercel login

# Inside the portfolio folder, link this project to Vercel
cd "C:\Users\USER\Documents\SKD\portfolio"
vercel link
```

The `vercel link` command will ask:
- **Set up and deploy?** → Yes
- **Which scope?** → Your personal account
- **Link to existing project?** → No (create a new one)
- **Project name?** → `portfolio` (or any name you like)
- **In which directory is your code?** → `./` (just press Enter)

After it finishes, a `.vercel/project.json` file is created. Open it:

```bash
cat .vercel/project.json
```

It looks like this — **copy both values**:

```json
{
  "orgId": "team_xxxxxxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxxxxxx"
}
```

Then **delete** the `.vercel/` folder — it is already in `.gitignore` and must not be committed:

```bash
# PowerShell
Remove-Item -Recurse -Force .vercel
```

---

### Step 3 — Create a Vercel personal access token

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Give it a name like `github-actions-portfolio`
4. Set expiration to **No Expiration** (or 1 year if you prefer to rotate it)
5. Click **Create** — **copy the token immediately**, Vercel will never show it again

---

### Step 4 — Add the 3 secrets to GitHub

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these three secrets one by one:

| Secret Name | Value |
|---|---|
| `VERCEL_TOKEN` | The token you just created in Step 3 |
| `VERCEL_ORG_ID` | The `orgId` value from `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | The `projectId` value from `.vercel/project.json` |

> **Important:** These values only ever live inside GitHub's encrypted secret store.  
> They are never stored in this repository or any file you commit.

---

### Step 5 — Push any commit to trigger the first deployment

```bash
git add .
git commit -m "add vercel deployment config"
git push origin main
```

Go to your GitHub repo → **Actions** tab.  
You will see the workflow running — CI check → deploy to production.  
When it finishes (≈ 2 minutes), your live URL appears on the Vercel dashboard.

---

### How the pipeline works after setup

```
Push to main
    │
    ▼
┌─────────────────────┐
│  CI: tsc --noEmit   │  ← fails fast if there are type errors
│  npm run build      │  ← fails fast if the bundle breaks
└────────┬────────────┘
         │ passes
         ▼
┌─────────────────────┐
│  Deploy → Production│  ← your live portfolio URL
└─────────────────────┘

Open a Pull Request
    │
    ▼
┌─────────────────────┐
│  CI: type-check     │
│  + build            │
└────────┬────────────┘
         │ passes
         ▼
┌─────────────────────┐
│  Deploy → Preview   │  ← unique URL per PR
│  Post URL on PR     │  ← comment added automatically
└─────────────────────┘
```

---

### Configure your custom domain (optional)

1. Vercel Dashboard → your project → **Settings** → **Domains**
2. Click **Add Domain** → enter your domain (e.g. `muthukumaran.dev`)
3. Add the DNS records Vercel shows you at your domain registrar
4. Vercel provisions a free SSL certificate automatically

---

## Contact

**Muthukumaran S**
- Email: [muthukumaran6967@gmail.com](mailto:muthukumaran6967@gmail.com)
- LinkedIn: [linkedin.com/in/muthukumaran-s](https://www.linkedin.com/in/muthukumaran-s/)
- GitHub: [github.com/Muthu031](https://github.com/Muthu031)
- Phone: +91 88383 36941
