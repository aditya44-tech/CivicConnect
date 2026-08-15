# CivicConnect

CivicConnect is a modern platform for citizens to report local issues, track their resolution, and upvote community concerns. It uses Next.js 15 with the App Router and Tailwind CSS.

## Folder Structure

Next.js uses a **file-system based router**, meaning the structure of the `app/` folder strictly defines the application's URLs and layouts.

```text
app/
├── (site)/         # Route Group for citizen-facing pages. Adds Navbar & Footer layouts.
│   ├── feed/       # -> /feed (Community complaints list)
│   ├── submit/     # -> /submit (Form to report an issue)
│   ├── my-complaints/ # -> /my-complaints (User dashboard)
│   └── complaints/ # -> /complaints/[id] (Detailed view of a single issue)
│
├── admin/          # Admin namespace. Uses a Sidebar layout instead of the Navbar.
│   ├── analytics/  # -> /admin/analytics (Platform statistics)
│   └── complaints/ # -> /admin/complaints (Admin table of all issues)
│
├── login/          # -> /login (Auth page, no global layouts, full screen)
├── signup/         # -> /signup (Auth page, no global layouts, full screen)
│
├── globals.css     # Global styles and design system tokens
└── layout.tsx      # Root HTML layout (shared across the entire application)
```

## How It Works

- **`(site)` Route Group**: By wrapping folders in parentheses, Next.js ignores the folder in the URL path. This allows us to share the `app/(site)/layout.tsx` (which contains the top navigation bar) across all citizen pages without forcing `/site/` into the URL.
- **`admin` Route**: The admin section has its own `layout.tsx` containing the dark sidebar.
- **`login` & `signup`**: These sit outside of `(site)` and `admin` so they can take over the entire screen without any navigation bars interfering.