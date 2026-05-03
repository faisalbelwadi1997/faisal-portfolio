# Portfolio Website — Full Context Document
> Faisal Ahmed Belwadi | faisalbelwadi1997.github.io/faisal-portfolio
> Last updated: May 2026
> Purpose: Complete reference for AI-assisted edits, updates, and maintenance

---

## 1. Owner & Identity

| Field | Value |
|---|---|
| Full name | Faisal Ahmed Belwadi |
| Email | faisal.belwadi1997@gmail.com |
| Phone | +91-7020525785 |
| LinkedIn | linkedin.com/in/faisal-belwadi-physicaldesign-cad |
| Location | Bengaluru, India |
| Current employer | Microsoft |
| Current role | Silicon PD CAD Engineer 2 |
| Portfolio URL | https://faisalbelwadi1997.github.io/faisal-portfolio/ |
| GitHub username | faisalbelwadi1997 |
| GitHub repo | https://github.com/faisalbelwadi1997/faisal-portfolio |

---

## 2. Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | 18.2.0 | UI component system |
| Bundler | Vite | 5.0.0 | Dev server + production build |
| 3D rendering | Three.js | 0.160.0 | Raw 3D geometry |
| 3D React layer | @react-three/fiber | 8.15.0 | React bindings for Three.js |
| 3D helpers | @react-three/drei | 9.95.0 | OrbitControls, helpers |
| Animation | Framer Motion | 11.0.0 | Page/section animations |
| Scroll detection | react-intersection-observer | 9.5.3 | Trigger animations on scroll |
| Fonts | Google Fonts | — | Syne (display) + DM Sans (body) |
| Hosting | GitHub Pages | — | Free, auto-deploy via Actions |
| CI/CD | GitHub Actions | — | Auto-build + deploy on push |
| Contact form | Formspree | free tier | Form backend (no server needed) |

---

## 3. Project File Structure

```
faisal-portfolio/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD (DO NOT EDIT unless changing deploy)
│
├── public/
│   └── resume.pdf              ← Drop Faisal's resume PDF here
│
├── src/
│   ├── main.jsx                ← React entry point (rarely needs editing)
│   ├── App.jsx                 ← Root component — controls section order
│   ├── index.css               ← Global CSS variables and base styles
│   │
│   ├── components/
│   │   ├── Nav.jsx             ← Top navigation bar
│   │   ├── Footer.jsx          ← Footer with links
│   │   └── ChipCanvas.jsx      ← 3D IC die — Three.js procedural chip
│   │
│   └── sections/
│       ├── Hero.jsx            ← Hero section with 3D chip + animated node cycler
│       ├── About.jsx           ← About section with 4 expertise cards
│       ├── Skills.jsx          ← Tech nodes, EDA tools, skill groups
│       ├── Experience.jsx      ← 3D scroll timeline + expandable job cards
│       ├── CaseStudies.jsx     ← 4 x 3D flip cards (case studies)
│       ├── Patents.jsx         ← Patents, publications, education cards
│       └── Contact.jsx         ← Contact links + Formspree form
│
├── index.html                  ← HTML entry (fonts loaded here)
├── vite.config.js              ← Vite config (base path set here)
├── package.json                ← Dependencies
└── PORTFOLIO_CONTEXT.md        ← This file
```

---

## 4. Design System

### 4.1 Color Tokens (defined in `src/index.css`)

| Token | Hex | Used for |
|---|---|---|
| `--white` | #ffffff | Page background |
| `--off-white` | #f8f7f5 | Alternate section backgrounds |
| `--surface` | #f1f0ed | Card backgrounds, tag backgrounds |
| `--border` | #e2e0db | Default borders |
| `--border-dark` | #c8c4bc | Emphasized borders, dividers |
| `--text-primary` | #0f0e0d | Headings, primary text |
| `--text-secondary` | #4a4843 | Body text, descriptions |
| `--text-muted` | #8a8680 | Labels, captions, helper text |
| `--accent` | #1a56db | Primary accent — links, highlights |
| `--accent-light` | #e8f0fe | Accent backgrounds, badges |
| `--accent-dark` | #1044b8 | Accent hover states |
| `--gold` | #c9a84c | Special highlights, Cadence timeline node |
| `--gold-light` | #f5edda | Gold accent backgrounds |

**To change the accent color:** Edit `--accent`, `--accent-light`, `--accent-dark` in `src/index.css`

### 4.2 Typography

| Role | Font | Weight | Where |
|---|---|---|---|
| Display / Headings | Syne | 700, 800 | All h1–h4, nav logo, section headings |
| Body | DM Sans | 300, 400, 500 | Paragraphs, labels, buttons, tags |

Fonts are loaded in `index.html` via Google Fonts. To change fonts, update both the `<link>` in `index.html` AND the CSS variables `--font-display` and `--font-body` in `index.css`.

### 4.3 Layout

- Max content width: `1200px` (set via `.container` class in `index.css`)
- Section padding: `100px 0` top and bottom
- Container horizontal padding: `40px` desktop, `20px` mobile
- Nav height: `68px` (`--nav-h` variable)

### 4.4 Section Background Alternation

| Section | Background |
|---|---|
| Hero | `--white` with grid overlay |
| About | `--off-white` |
| Skills | `--white` |
| Experience | `--off-white` |
| Case Studies | `--white` |
| Patents | `--off-white` |
| Contact | `--white` |
| Footer | `--off-white` |

---

## 5. Section-by-Section Content Reference

### 5.1 Hero (`src/sections/Hero.jsx`)

**What's in it:**
- Animated status badge: "Open to Senior / Staff roles" (green dot)
- Name: Faisal Ahmed Belwadi
- Animated tech node cycler (28nm → 16nm → 7nm → 5nm → 3nm → 2nm, cycles every 1.8s)
- Tagline paragraph
- Two CTA buttons: "View Projects" (→ #projects) and "LinkedIn ↗"
- Stats row: 5.5+ years / 2nm–28nm / 3+ Tapeouts
- Right side: 3D rotating IC die (ChipCanvas component)

**To update:**
- Change status badge text: edit the `<span>` inside the green badge div
- Change stats: edit the array `['5.5+', 'Years experience'], ['2nm–28nm', 'Tech nodes'], ['3+', 'Tapeouts owned']`
- Change node cycle list: edit `const nodes = ['28nm', '16nm', '7nm', '5nm', '3nm', '2nm']`
- Change cycle speed: edit `1800` in the `setInterval` call (milliseconds)
- Change LinkedIn URL: update `href` on the LinkedIn button

---

### 5.2 About (`src/sections/About.jsx`)

**What's in it:**
- Section heading: "I build the infra that ships chips faster."
- 3 paragraphs of bio text
- Email link
- 4 expertise cards (grid 2×2):
  1. Physical Design
  2. AI & Automation
  3. PD CAD Methodology
  4. Safety-Critical Design

**To update:**
- Edit bio paragraphs directly in the JSX `<p>` tags
- Edit expertise cards: find the `highlights` array at the top of the file — each object has `icon`, `label`, `desc`
- Add a 5th card: add to the `highlights` array (grid auto-adjusts)

---

### 5.3 Skills (`src/sections/Skills.jsx`)

**What's in it:**
- Tech node timeline (animated, staggered): 2nm → 28nm with labels
- EDA tools chips grid with category badges
- 3 skill groups: Physical Design / PD CAD & Methodology / AI & Automation

**Key data arrays to edit:**

```js
// Tech nodes — edit label, status ('current' or 'done'), note
const nodes = [
  { label: '2nm', status: 'current', note: 'Microsoft PD CAD' },
  { label: '3nm', status: 'current', note: 'Microsoft PD CAD' },
  ...
]

// EDA tools — edit name and cat (category badge)
const tools = [
  { name: 'Innovus', cat: 'PnR' },
  { name: 'Genus', cat: 'Synthesis' },
  ...
]

// Skill groups — edit group name and items array
const skills = [
  { group: 'Physical Design', items: ['RTL-to-GDSII', 'Floorplanning', ...] },
  { group: 'PD CAD & Methodology', items: [...] },
  { group: 'AI & Automation', items: [...] },
]
```

**To add a new tech node:** Add to `nodes` array. `status: 'current'` gives it dark background + green dot.
**To add a tool:** Add `{ name: 'ToolName', cat: 'Category' }` to `tools` array.
**To add a skill group:** Add a new object to `skills` array and update grid to `repeat(4, 1fr)`.

---

### 5.4 Experience (`src/sections/Experience.jsx`)

**What's in it:**
- Left: sticky 3D rotating orb with career path nodes (Three.js, scroll-driven active state)
- Right: expandable job cards, click to expand highlights

**Key data array:**

```js
const experiences = [
  {
    company: 'Microsoft',
    role: 'Silicon PD CAD Engineer 2',
    period: 'Oct 2024 – Present',
    location: 'Bengaluru, India',
    node: '3nm / 2nm',
    color: '#0078d4',           // ← color of the timeline node + card border
    highlights: [               // ← bullet points shown on expand
      'Leading 4-member regression team...',
      ...
    ],
  },
  ...
]
```

**To add a new job:** Add a new object to the top of the `experiences` array (most recent first).
**To change a job's color:** Edit the `color` field — use any hex value.
**To edit bullet points:** Edit the `highlights` array for that job.
**To change timeline orb behavior:** The orb rotates via `useFrame` in `TimelinePath` — edit `+= 0.003` to change speed.

---

### 5.5 Case Studies (`src/sections/CaseStudies.jsx`)

**What's in it:**
- 4 × 3D CSS flip cards in a 2×2 grid
- Front: problem statement + tools used
- Back: impact metrics (2×2 grid) + approach paragraph

**Key data array:**

```js
const cases = [
  {
    id: 'cerebrus',
    title: 'Cerebrus ML-Driven PPA Optimization',
    company: 'Cadence Design Systems',
    node: '7nm',
    tag: 'ML / PPA',
    tagColor: '#7c3aed',        // ← tag text + icon color
    tagBg: '#ede9fe',           // ← tag background color
    icon: '◈',                  // ← decorative icon on front
    problem: '...',             // ← shown on front card
    approach: '...',            // ← shown on back card
    impact: [                   // ← 4 metric boxes on back (max 4)
      { metric: '14%', label: 'frequency gain' },
      ...
    ],
    tools: ['Cerebrus', 'Innovus', ...],  // ← shown as tags on front (first 4 shown)
  },
  ...
]
```

**To add a 5th case study:** Add to `cases` array — grid will expand to 3 columns or you can change grid to `repeat(3, 1fr)`.
**To change flip animation speed:** Find `transition: 'transform 0.65s` and change `0.65s`.
**To change back card color:** Back card has `background: 'var(--text-primary)'` — change to any color.

---

### 5.6 Patents & Education (`src/sections/Patents.jsx`)

**Key data array:**

```js
const items = [
  {
    type: 'Patent',
    title: 'Remote Automated Health Care Assistant',
    details: 'Indian Patent · Application No. 201821036329A · Filed 2018',
    desc: '...',
    color: '#7c3aed',
    bg: '#ede9fe',
  },
  ...
]
```

**To add a publication or award:** Add a new object. `type` becomes the badge label.

---

### 5.7 Contact (`src/sections/Contact.jsx`)

**What's in it:**
- Heading + availability statement
- 3 direct contact tiles: Email / LinkedIn / Phone
- Contact form powered by Formspree

**To activate the contact form:**
1. Go to formspree.io → create free account → New Form
2. Copy the Form ID (looks like `xpzgkwqr`)
3. In `Contact.jsx` find: `'https://formspree.io/f/YOUR_FORM_ID'`
4. Replace `YOUR_FORM_ID` with your actual ID

**To update contact details:** Edit the `href` and `val` fields in the tiles array:
```js
{ label: 'Email', href: 'mailto:faisal.belwadi1997@gmail.com', val: 'faisal.belwadi1997@gmail.com' },
{ label: 'LinkedIn', href: 'https://linkedin.com/in/...', val: 'linkedin.com/in/faisal-belwadi' },
{ label: 'Phone', href: 'tel:+917020525785', val: '+91 70205 25785' },
```

**To change availability message:** Edit the `<p>` paragraph below the heading.

---

### 5.8 Navigation (`src/components/Nav.jsx`)

**Nav links array:**
```js
const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact']
```
Each link scrolls to `#about`, `#skills`, `#experience`, `#projects`, `#contact` respectively. The section `id` must match (lowercase).

**Resume button:** Links to `/resume.pdf` — drop your PDF in the `public/` folder.

**Logo:** `FAB.` — change in the `<a>` tag near the top of Nav.jsx.

---

### 5.9 3D Chip (`src/components/ChipCanvas.jsx`)

The IC die is 100% procedurally generated — no external assets. Built with Three.js inside React Three Fiber.

**Layers (bottom → top):**

| Layer | Color | Represents |
|---|---|---|
| Substrate | #0d1117 (near black) | Silicon base |
| Diffusion | #0a2a1e (dark green) | Active regions |
| M1 | #1a0a0a (dark red) | First metal routing |
| M2 | #1a1208 (dark orange) | Second metal routing |
| M3 Power | #141a08 (dark gold) | Power stripes |
| Upper metal | #080e1a (dark blue) | Global routing |
| Passivation | #1a1a2a (dark purple) | Top layer |

**Routing lines:**
- Horizontal M1 lines: `#8b1a1a` (dark red), 18 lines
- Vertical M2 lines: `#7a4a10` (dark orange), 18 lines
- Power stripes M3: `#c9a84c` (gold), 5 stripes

**Pad ring:** `#c0c8d0` (silver), 10 pads per side

**To change rotation speed:** Edit `t * 0.18` in `useFrame` — higher = faster
**To change tilt:** Edit `Math.sin(t * 0.12) * 0.12 + 0.25` — the `0.25` is the base tilt angle
**To change chip size:** Edit `const size = 3.2` at the top of `ChipDie`
**To change lighting color:** Edit `color` in the `<directionalLight>` and `<pointLight>` components

---

## 6. How to Deploy Changes

### Every time you edit files:

```bash
# Open Git Bash in the portfolio folder
cd ~/Downloads/portfolio       # or wherever you unzipped it

# Stage all changes
git add .

# Commit with a description of what changed
git commit -m "update: YOUR DESCRIPTION HERE"

# Push — auto-deploys in ~60 seconds
git push
```

**Watch the deploy:** Go to github.com/faisalbelwadi1997/faisal-portfolio → Actions tab → watch the workflow run.

**Live URL:** https://faisalbelwadi1997.github.io/faisal-portfolio/

---

## 7. Common Change Instructions for AI

When asking an AI to make changes, paste this file as context and use these prompt patterns:

| What you want | How to ask |
|---|---|
| New job entry | "Add a new job at [Company] as [Role] from [Period] at [Node]. Highlights: [bullet points]. Use color [hex]." |
| New case study | "Add a 4th/5th case study card: title [X], problem [Y], approach [Z], impact metrics [A/B/C/D], tools [list], tag [label] with color [hex]." |
| New skill | "Add [skill name] to the [Physical Design / PD CAD / AI & Automation] skill group in Skills.jsx." |
| New tech node | "Add [Xnm] as a [current/done] node with note [text] to the node timeline in Skills.jsx." |
| Change accent color | "Change the accent color from #1a56db to [new hex] in index.css — update --accent, --accent-light, and --accent-dark." |
| Change heading | "Change the hero heading from [...] to [...] in Hero.jsx." |
| Update bio | "Update the About section bio paragraphs to: [new text]." |
| Add contact tile | "Add a [GitHub/Twitter/etc] tile in Contact.jsx with href [url] and label [text]." |
| Change font | "Change the display font from Syne to [font name] — update the Google Fonts link in index.html and --font-display in index.css." |
| Fix chip color | "Change the M3 power stripe color in ChipCanvas.jsx from #c9a84c to [new hex]." |

---

## 8. GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

**Trigger:** Every push to the `main` branch.

**Steps:**
1. Checkout code
2. Setup Node 20
3. `npm install`
4. `npm run build` → outputs to `/dist`
5. Upload `/dist` as GitHub Pages artifact
6. Deploy to GitHub Pages

**Required repo settings:**
- Settings → Actions → General → Workflow permissions → **Read and write permissions** ✓
- Settings → Pages → Source → **GitHub Actions** ✓

**If deploy fails with 404:** Re-check workflow permissions above.
**If build fails:** Check the Actions log for the exact error line and share with AI.

---

## 9. Key Dependencies & Why They're There

| Package | Why |
|---|---|
| `three` | Core 3D engine — used for IC die geometry, timeline path |
| `@react-three/fiber` | React wrapper for Three.js — lets us use Three inside React components |
| `@react-three/drei` | Provides `OrbitControls` and other Three.js helpers |
| `framer-motion` | Smooth animations — currently used for scroll-reveal transitions |
| `react-intersection-observer` | Detects when sections enter viewport to trigger animations |

---

## 10. Things Still To Do

- [ ] Replace `YOUR_FORM_ID` in `Contact.jsx` with real Formspree ID
- [ ] Add `resume.pdf` to `/public/` folder
- [ ] Add a profile photo to About section (currently no photo placeholder)
- [ ] Add AI Workflow / MCP expertise as a dedicated section or prominent About card
- [ ] Consider adding a Blog section for thought leadership content
- [ ] Add Open Graph meta tags in `index.html` for LinkedIn link previews
- [ ] Consider adding Google Analytics (`gtag`) for visitor tracking

---

## 11. Vite Base Path

```js
// vite.config.js
base: '/faisal-portfolio/'
```

This must match the GitHub repo name exactly. If you ever rename the repo, update this value and push — otherwise the site will show a blank page.

---

*This document should be kept up to date whenever major changes are made to the portfolio.*
