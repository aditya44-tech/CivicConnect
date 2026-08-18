# CivicConnect

CivicConnect is a modern platform for citizens to report local issues and track their resolution.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | NeonDB (Postgres) |
| ORM | Prisma |
| Auth | NextAuth.js (credentials + JWT, citizen/admin roles) |
| Image Upload | Cloudinary |
| Maps | Leaflet + OpenStreetMap |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the real values:

- **`DATABASE_URL`** — create a free project at [neon.tech](https://neon.tech), copy the connection string from the dashboard.
- **`NEXTAUTH_SECRET`** — generate with `openssl rand -base64 32`.
- **`CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`** — create a free account at [cloudinary.com](https://cloudinary.com) → Dashboard → API Keys.

### 3. Create the schema and seed the database

```bash
npm run db:push   # create tables in NeonDB
npm run db:seed   # load the demo complaints, comments, and users
```

Seed accounts:

| Role | Email | Password |
| --- | --- | --- |
| Citizen | `you@example.com` | `password123` |
| Admin | `admin@riverside.gov` | `admin123` |

### 4. Run the dev server

```bash
npm run dev -- -p 3000   # pin the port — the ambient shell sets PORT=0
```

> **Demo mode:** without a real `DATABASE_URL`, pages automatically fall back to
> the static mock data in `lib/data.ts` so the UI stays browsable. The moment you
> add your Neon URL, all reads/writes go to Postgres.

## Folder Structure

```text
app/
├── (site)/         # Citizen-facing pages (Navbar layout)
│   ├── feed/       # -> /feed (Community complaints list)
│   ├── submit/     # -> /submit (Report an issue — photo upload + map pin)
│   ├── my-complaints/ # -> /my-complaints (Your reports, session-guarded)
│   └── complaints/ # -> /complaints/[id] (Detailed view of a single issue)
│
├── admin/          # Admin namespace (Sidebar layout, ADMIN role required)
│   ├── analytics/  # -> /admin/analytics (Platform statistics)
│   └── complaints/ # -> /admin/complaints (Manage all issues)
│
├── login/          # -> /login (NextAuth credentials sign-in)
├── signup/         # -> /signup (Creates a citizen account)
├── admin-login/    # -> /admin-login (ADMIN-role sign-in)
│
├── api/            # Route handlers (complaints, comments, upload, auth)
├── globals.css     # Global styles and design system tokens
└── layout.tsx      # Root HTML layout

lib/
├── prisma.ts       # Prisma client singleton
├── queries.ts      # Data access layer (reads/writes, demo-mode fallback)
├── mappers.ts      # DB rows → UI shapes
├── auth.ts         # NextAuth config, session helpers, role guards
└── cloudinary.ts   # Cloudinary client

prisma/
├── schema.prisma   # User / Complaint / Comment models
└── seed.ts         # Demo data loader
```

## Key Scripts

```bash
npm run dev          # start the dev server
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm run db:push      # push the Prisma schema to the database
npm run db:seed      # load demo data
npm run db:generate  # regenerate the Prisma client
```
