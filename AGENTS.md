# AGENTS.md

## Commands
- `pnpm dev` — start dev server
- `pnpm build` — build to `dist/`
- `pnpm preview` — preview production build
- `pnpm astro check` — type-check the project

## Architecture
- Astro 6.x static site; all source in `src/`
- `pages/` → routes, `layouts/` → page shells, `components/` → reusable `.astro`/UI files
- Node ≥ 22.12.0 required (enforced in `engines`)

## Do Not Edit
- `.astro/` — auto-generated types directory
- `dist/` — build output
