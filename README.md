# Rajat Nanavati Portfolio

A minimal, monochrome, animated portfolio for Rajat Nanavati.

Live: [rajatnanavati.vercel.app](https://rajatnanavati.vercel.app)

## Overview

This project presents professional profile, work, projects, and contact content as a fast, responsive portfolio website with smooth Framer Motion transitions, clean spacing, and a focused dark interface.

The codebase is intentionally modular: content, motion configuration, reusable UI, and page sections are separated so the site can be updated without touching the full app shell.

## Stack

- React
- Vite
- Framer Motion
- Lucide React
- Plain CSS
- Vercel
- Vercel Web Analytics
- Vercel Speed Insights

## Structure

```txt
src/
  components/   Reusable UI and motion primitives
  config/       Animation constants
  data/         Profile content, links, labels, and section copy
  sections/     Page sections composed from components and data
  App.jsx       App shell and loader state
  styles.css    Theme, layout, responsive rules, and visual effects
```

## Local Development

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
```

Preview production output:

```sh
npm run preview
```

## CI/CD

CI/CD is implemented for this project.

- GitHub Actions runs install, high-severity audit, and production build checks on `main`.
- Vercel is connected to the GitHub repository.
- Every push to `main` automatically deploys the latest production version.

## Observability

- Vercel Web Analytics tracks page views, visitors, referrers, and device/browser data.
- Vercel Speed Insights tracks real-user performance metrics after deployment.

## Deployment

- Platform: Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
