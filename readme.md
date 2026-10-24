# Japneet Singh — Portfolio

A portrait-led portfolio built with React, Vite, Tailwind CSS, shadcn/ui, and Magic UI. Visual direction: oversized typography, a floating navigation bar, handwritten interactive notes, large alternating project stories, and a charcoal/cream theme with a warm accent. Includes responsive navigation, project search/category filters, accessible native project dialogs, an interactive engineering diagram, persistent light/dark themes, expandable experience, and one-click email copying.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Content and sources

- `src/data/portfolio.js`: curated projects, work experience, skills, recognition, and contact details.
- Resume content updated from the latest `Japneet_Singh_Resume_Amazon.pdf` in the “Find matching company openings” chat on 24 October 2026. Downloadable copy: `public/Japneet-Singh-Resume.pdf`.
- `src/data/github.json`: public GitHub repository snapshot for Orcus01, refreshed 24 October 2026.
- Run `npm run sync:github` to refresh public repository metadata, then rebuild. No GitHub credentials or API keys are shipped to the browser. Existing data stays intact if the fetch fails.
- Seats & Spaces full-stack details come from the resume. Its linked public `seats-spaces` repository is a separate React storefront, explicitly labeled in the detail dialog.
- Grownity experience and community roles retained from the original portfolio; IEEE PES term updated to 2024–2025 from the resume.
- External project links are supplied sources; ongoing deployment availability is controlled by their owners.

## Design components

shadcn/ui configuration is in `components.json`. Components live in `src/components/ui`. The Magic UI registry is configured as `@magicui`; Blur Fade powers restrained entrance and project reveal animations and respects reduced motion. Theme tokens are defined in `src/design.css`; the unused legacy components and dependencies have been removed.

## Validation

Production build passes. Browser checks covered project category/search/empty states, project dialog opening/closing, engineering layer selection, theme persistence after reload, navigation dialog, mobile navigation, clipboard feedback, and desktop/mobile overflow. Latest tested viewports: 1440×1000 and 390×844.

The live site is published from the `gh-pages` branch. `main` contains the source.

## Image assets and motion

The only portrait used is `src/assets/japneet-balanced-avatar.png`, edited with built-in ImageGen from the user-supplied avatar. The avatar appears in the hero and About section; there is no photo switch. Kissan Konnect and Raahi previews use screenshots from their public repositories.

Pointer tilt, the portrait reveal, and the desktop hero-to-work slide respect reduced-motion preferences. The lower sections use staggered reveals, a scroll-linked career line, and restrained hover effects. Public repositories expand on demand.

## Styles and responsiveness

`src/index.css` holds base styles, `src/design.css` defines the visual direction and theme tokens, and `src/responsive.css` is the authoritative responsive/layout layer. These remain layered; some repeated selectors are intentional breakpoint and design overrides. The chair illustration is active project artwork, not unused CSS. Unused ticker and leaf rules have been removed.

Responsive geometry was checked at 320, 360, 390, 600, 768, 1024, 1440, 1920, and 2560 CSS pixels during the redesign. The latest regression checks cover mobile-menu Escape dismissal and desktop resize scroll recovery, search across details with surrounding whitespace, dialog padding/backdrop clicks, project modal opening/Escape, persisted light theme, and navigation through Recognition.

A startup script applies the saved theme before first paint. Rendering failures show a reload/contact fallback; event handlers still require their own guards. Unused source files were archived outside the repository before removal; tracked originals are also recoverable from Git history.

## GitHub Pages

The public site is hosted at https://orcus01.github.io/Portfolio/. Build with `npm run build:pages` and publish the contents of `dist/` to the `gh-pages` branch. The regular `npm run build` retains root-path hosting support.
