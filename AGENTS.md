# AGENTS.md

## Project
- **CivicConnect** — Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 frontend-only demo: a city complaint & resolution tracking platform. All data is static mock data in `lib/data.ts`; no backend, no API calls, no auth guards, no real form submission.
- Key commands (from repo root): `npm install`, `npm run dev` (port 3000), `npm run build`, `npm run typecheck` (`tsc --noEmit`).
- Styling: Tailwind v4 with `@theme` tokens in `app/globals.css`. The brand palette is **violet (primary) — never blue** (user constraint); statuses are amber = Pending, violet = Ongoing, green = Resolved. Keep `bg-map-grid` and `.no-scrollbar` utilities in globals.css if you need map/scroll patterns.
- Routes: `/` landing, `/login`, `/signup`, `/feed` (client-filtered), `/submit`, `/my-complaints`, `/complaints/[id]` (static params), `/admin`, `/admin/complaints`, `/admin/complaints/[id]`, `/admin/analytics`. Citizen pages live in the `(site)` route group (Navbar + mobile bottom tab bar); admin has its own layout with Sidebar.
- Reusable UI in `components/`: `Button`, `StatusBadge`, `ComplaintCard`, `Navbar`, `BottomTabBar`, `Sidebar`, `StatusTimeline`, `CommentsSection`, `AdminManagementPanel`, plus an inline SVG icon set (`icons.tsx`) — no icon library dependency.
- Complaint images use `picsum.photos` seeded URLs defined in `lib/data.ts`. Interactive pages are client components; everything else stays a server component.

## Freebuff metadata (`.freebuff/`)
- The app's source of truth for project state is `.freebuff/desktop-v2.db` (`projects.root_path`, `threads` branch/worktree_path/base_ref). Read it read-only via URI `file:<path>?mode=ro` with python's sqlite3 (no CLI on PATH); reconfigure stdout to UTF-8 first — cp1252 crashes on non-ASCII.
- Run guide for the dev server lives in `.freebuff/run.md`.
