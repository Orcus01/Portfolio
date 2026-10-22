# Japneet Singh — Portfolio

Recruiter-focused Java and full-stack development portfolio.

Live site: https://japneet-singh.netlify.app/

## Content

- Current Cognizant experience with Temenos Transact, Azure, and AWS.
- Seats & Spaces, LabConnect (training), and Kissan Konnect project write-ups.
- Expandable engineering notes and links to available source code, demos, and research.
- Skills, education, certifications, achievements, and completed leadership roles.
- Local resume PDF, keyboard navigation, reduced-motion support, and responsive layouts.
- Black-and-silver hero: a single Canvas 2D point cloud morphs from a dot into JAPNEET, PORTFOLIO, and the existing portrait.
- Replay, skip, and pause controls. Reduced-motion preferences render a static assembled portrait.
- Canvas pixel ratio and particle counts are capped; animation stops when offscreen or the document is hidden.

## Development

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Netlify build command: `npm run build`. Publish directory: `dist`.

## Updating content

The active page and project content live in `src/App.jsx`. Styles are in `src/portfolio.css`, loaded after Tailwind's base styles in `src/main.jsx`. Page metadata is in `index.html`.

The resume is served from `public/Japneet_Singh_Resume.pdf`. Keep claims, dates, links, and the downloadable resume aligned when making updates. Older components and assets remain in the repository but are not mounted by the current app.

No LeetCode or open-source contribution claims are displayed. Add them only when supported by the relevant public profiles or contributions.

## Portrait animation

`src/components/ParticleHero.jsx` samples the bundled approved portrait and text into point targets at runtime. The particles resolve into the full portrait image for clarity. No face-generation API, video, WebGL dependency, or external image request runs in the website. Update `src/assets/portrait-approved.webp` to change the source photo. Morph timing, particle counts, sampling, pointer interaction, and lifecycle cleanup live in that component; the visual treatment is in `src/portfolio.css`.

The active portrait is an AI-assisted edit of the user-approved black-jacket reference: targeted upper-cheek grooming, slightly larger glasses of the same style, and a straight-on torso with broader shoulders. The active clothing is a charcoal blazer over a fitted black open-collar shirt, with a subtle closed-mouth smile and broader balanced shoulders. The resolved image uses the same contain geometry as the particle sampler to preserve its proportions at every viewport size. Facial identity, expression, turban, and lighting follow the approved reference. Only the optimised transparent WebP is bundled by the active page.

## Site interactions

- `src/components/MotionSystem.jsx`: scroll reveals, page progress, reduced-motion handling, and fine-pointer card tilt.
- `src/components/ProjectVisual.jsx`: the genuine Seats & Spaces screenshot plus clearly labelled architecture/research illustrations.
- Project filters animate between personal, training, and research work. Engineering details use native accessible disclosures.
- The experience timeline, skill chips, credential cards, and contact area include hover and scroll motion. CSS animations disable for reduced-motion preferences.
- Framer Motion was already a project dependency and is now used by the active page.
