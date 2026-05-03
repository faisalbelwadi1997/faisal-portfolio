# Faisal Ahmed Belwadi — Portfolio

Personal portfolio website built with React + Vite + Three.js.

**Live:** https://faisalbelwadi.github.io/faisal-portfolio/

## Tech Stack
- React 18 + Vite
- Three.js + React Three Fiber (3D chip, 3D timeline)
- Framer Motion (animations)
- GitHub Pages (hosting)

## Local Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

### One-time setup:
1. Create repo named `faisal-portfolio` on GitHub
2. Push this code: `git push origin main`
3. Go to **Settings → Pages → Source** → set to **GitHub Actions**
4. Every push to `main` auto-deploys

### Set up contact form:
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a form and copy your Form ID
3. In `src/sections/Contact.jsx`, replace `YOUR_FORM_ID` with your actual ID

## Customise
- Update `vite.config.js` base path if repo name differs
- Replace resume PDF: add `resume.pdf` to `/public/`
- Update Formspree ID in `Contact.jsx`
