# Japneet Singh — Portfolio

Recruiter-focused Java and full-stack development portfolio.

Live site: https://japneet-singh.netlify.app/

## Content

- Current Cognizant experience with Temenos Transact, Azure, and AWS.
- Seats & Spaces, LabConnect (training), and Kissan Konnect project write-ups.
- Expandable engineering notes and links to available source code, demos, and research.
- Skills, education, certifications, achievements, and completed leadership roles.
- Local resume PDF, keyboard navigation, reduced-motion support, and responsive layouts.

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
