# CivicConnect

CivicConnect is a modern platform for citizens to report local issues, track their resolution, and upvote community concerns. It uses Next.js 15 with the App Router and Tailwind CSS.

## Folder Structure

Next.js uses a **file-system based router**, meaning the structure of the `app/` folder strictly defines the application's URLs and layouts.


## How It Works

- **`(site)` Route Group**: By wrapping folders in parentheses, Next.js ignores the folder in the URL path. This allows us to share the `app/(site)/layout.tsx` (which contains the top navigation bar) across all citizen pages without forcing `/site/` into the URL.
- **`admin` Route**: The admin section has its own `layout.tsx` containing the dark sidebar.
- **`login` & `signup`**: These sit outside of `(site)` and `admin` so they can take over the entire screen without any navigation bars interfering.
