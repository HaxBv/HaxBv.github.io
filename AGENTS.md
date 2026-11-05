# AGENTS.md

## Repository

- Personal game-developer portfolio published at https://haxbv.github.io from `HaxBv/HaxBv.github.io`; `main` is the only branch.
- React 19 + Vite 8 single-page app. Source lives in `src/`, static assets in `public/`, and production output in `dist/`.
- Keep content factual. Do not invent project details, screenshots, videos, skills, statistics, links, or contact information. Empty project content arrays are intentional and render in-development states.
- `README.md` is minimal and should be preserved unless the user asks for changes.

## Commands

- Requires Node `>=20.19.0` and npm. This checkout has been tested with Node `26.13.0` and npm `11.20.0`.
- `npm install`: install dependencies locally.
- `npm run dev`: start the Vite development server.
- `npm run build`: create the production site in `dist/`.
- `npm run preview`: serve the built site locally.
- There is no test or lint configuration. Run `npm run build` and verify the affected UI in a browser before finishing.

## Deployment

- `.github/workflows/deploy.yml` deploys every push to `main` and supports manual dispatch. It runs `npm ci`, builds with Vite, uploads `dist/`, and deploys through GitHub Pages Actions.
- The repository's Pages source must be set to **GitHub Actions**. Do not restore the legacy Jekyll pipeline, and do not add `.nojekyll`.
- `dist/` and `node_modules/` are ignored and must not be committed.
- Verify changes on the live site after pushing; there is no staging environment.

## Architecture

- `src/main.jsx` mounts the app; `src/App.jsx` owns the `HashRouter`, persistent layout, routes, skip link, document title, and theme-color updates.
- Routes: `/`, `/projects`, `/skills`, `/about`, `/contact`, `/projects/:slug`, and a not-found fallback.
- Section routes reuse `HomePage`; `ScrollManager` scrolls to the matching section. Because the router uses the URL hash, normal fragment navigation needs JavaScript handling.
- Project data and palettes live in `src/data/projects.js`; site/navigation metadata lives in `src/data/site.js`.
- `src/lib/theme.js` converts project palettes into CSS variables, including derived line, glow, and header tokens. Style components through these variables rather than hardcoding palette colors.
- Global tokens and resets are in `src/styles/`. Silkscreen fonts and their OFL license are self-hosted in `public/fonts/`.

## Working notes

- This Windows checkout has no `git` on PATH. Do not install Git; use GitHub Desktop or the GitHub web UI. The user handles commits and pushes unless they explicitly ask otherwise.
- Node and npm are available from the terminal.
