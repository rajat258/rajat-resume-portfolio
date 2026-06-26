# Rajat Resume Portfolio

Minimal animated resume portfolio for Rajat Nanavati, built with React, Vite, Framer Motion, and plain CSS.

## Structure

```txt
src/
  components/   Reusable UI and motion primitives
  config/       Animation constants
  data/         Resume content, links, labels, and section copy
  sections/     Page sections composed from components and data
  App.jsx       App shell and loader orchestration
  styles.css    Theme, layout, responsive rules, and CSS animations
```

## Scripts

```sh
npm run dev
npm run build
npm run preview
```

## Deployment

This project is ready for Vercel.

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

The GitHub Actions workflow runs `npm ci`, `npm audit --audit-level=high`, and `npm run build` on pushes and pull requests to `main`.
