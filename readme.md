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

shadcn/ui configuration is in `components.json`. Components live in `src/components/ui`. The Magic UI registry is configured as `@magicui`; Blur Fade powers restrained entrance and project reveal animations and respects reduced motion. Theme tokens preserve the original Tailwind color names for compatibility with retained legacy components.

## Validation

Production build passes. Browser checks covered project category/search/empty states, project dialog opening/closing, engineering layer selection, theme persistence after reload, navigation dialog, mobile navigation, clipboard feedback, and desktop/mobile overflow. Latest tested viewports: 1440×1000 and 390×844.

Changes are local; publishing is a separate action.

## Image assets

The current hero uses the newer charcoal-blazer portrait from the resume chat, processed with built-in ImageGen for background removal. `src/assets/japneet-editorial.png` is the final transparent asset. Kissan Konnect and Raahi previews use actual screenshots from their public GitHub repositories. `src/design.css` contains the current visual direction; `src/index.css` holds shared base styles.

## Avatar and cinematic motion

The hero defaults to the orange-lit avatar in `src/assets/japneet-avatar-navy.png`, generated with built-in ImageGen from Japneet's portrait and the user's supplied style reference. Avatar/Photo buttons switch appearances; the replay button repeats the camera shutter reveal. Motion adds pointer tilt, portrait scroll depth, sliding title words, and a pinned hero with Work sliding over it on desktop. At smaller viewports projects use normal flow. Reduced-motion settings disable large motion and the pinned hero transition.

## Responsive layout corrections

`src/responsive.css` is the authoritative layout layer: one gutter scale, full-width sections, contained grid columns, and normal-flow project rows. The hero-to-work transition pins the hero on sufficiently tall desktop displays; phones and reduced-motion users use normal flow. Cursor movement drives the portrait and trailing highlight for fine pointers. Both current portraits were rebuilt using the original `Japneet_Photo.JPG` as the facial reference, with navy turbans.

Responsive geometry checked at 320, 360, 390, 600, 768, 1024, 1440, 1920, and 2560 CSS pixels. Project search, clearing, category filters, detail dialogs, photo/avatar switching, mobile navigation, and the hero overlap were checked in the browser.

## GitHub Pages

The public site is hosted at https://orcus01.github.io/Portfolio/. Build with `npm run build:pages` and publish the contents of `dist/` to the `gh-pages` branch. The regular `npm run build` retains root-path hosting support.
